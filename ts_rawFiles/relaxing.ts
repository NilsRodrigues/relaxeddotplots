
/**
    execute one relaxation step 
    Includes tunnel swap, updating cells
    
*/
async function relaxationStep(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam, voronoiGl:VoronoiGL, hasColor: boolean): Promise<RelaxStatus> {
    let delaunay: any;
    // let currentTime: number = Date.now();

    tunnelSwap(inputConfig, circleData, hasColor);

    

    if(inputConfig.relaxing.useWebGL){
        // get a pixelmap through WebGL
        return voronoiGl.updateCells(inputConfig, circleData, plotParam);
    } else {
        plotParam.supSampWidth = Math.floor(Math.floor(plotParam.width) * inputConfig.relaxing.supSampFactor);
        plotParam.supSampHeight = Math.floor(Math.floor(plotParam.height) * inputConfig.relaxing.supSampFactor);
        // delaunay creation without WebGL
        delaunay = d3.Delaunay.from(circleData, (circle: Circle)=>circle.xPix, (circle: Circle)=>plotParam.supSampHeight-(circle.yPix));
        // let voronoi = delaunay.voronoi([0,0,plotParam.supSampWidth,plotParam.supSampHeight]);
        // let render = delaunay.render();
        // let render = voronoi.render();
        // densityPlot.attr("d", render)
        return Promise.resolve(updateCells(inputConfig, circleData, plotParam, delaunay));
    }
}

/**
 * 
 * @param inputConfig 
 * @param circleData 
 * @param hasColor 
 * 
 * Reduce dots blocking each other during relaxing by swapping dots.
 * Going through every dot and only check a small environment to find a swap partner
 * Every dot swaps once; with the best possible match
 * 
 */
function tunnelSwap(inputConfig: InputConfig, circleData: CircleData, hasColor: boolean){

    let length = circleData.length;
    // sort the alreadz nearly sorted array
    circleData = insertionSort(circleData, length);
    
	// search for swap partners
    let swapCount: number = 0;
    let otherDot: Circle;
	const colorTolerance = Math.pow(inputConfig.color.differenceTolerance, 2);
	const useImages = inputConfig.images.useImages;
    for(let i = 1; i < length; i++){
		let selfDot = circleData[i];
		
		let selfDistance = selfDot.xPix - selfDot.origXpix;
		// can't improve on perfection
		if (selfDistance == 0)
			continue;
		
		// get current error. we don't need exact error (only for comparison).
		// use radius instead of diameter (saves us multiplying by 2)
        let selfError = Math.pow(selfDistance / selfDot.radiusPix, 2);
        let bestError = Infinity;
        let bestSwapIndex = -1;
		
        // direction of swap search
        let direction = selfDistance > 0 ? -1 : 1;
		let limit = selfDot.origXpix - selfDistance;
		
        // for loop with calculating new self error and checking if it is smaller than out current self error.
        for(let j = i+direction; j >= 0 && j < length; j+=direction){
			otherDot = circleData[j];
			
			// stop if we run outside search range
			if ((selfDistance < 0 && otherDot.xPix > limit) || (selfDistance > 0 && otherDot.xPix < limit))
				break;
			
            // check for: same Index and if the dot class is equal or similar (no swap on different classes)
			// euclidian difference requires sum of squares and then root. we don't need exact value (only for comparison).
			// use square of distance and tolerance (saves us the root calculation).
            let colorDiff = Math.pow(selfDot.origColor.l - circleData[j].origColor.l, 2.0)
                     + Math.pow(selfDot.origColor.a - circleData[j].origColor.a, 2.0)
                     + Math.pow(selfDot.origColor.b - circleData[j].origColor.b, 2.0);
            if((useImages && !hasColor && selfDot.URL != otherDot.URL) || (hasColor && colorDiff > colorTolerance))
				continue;

			// calculate new error in case of swap
            let otherError = Math.pow((otherDot.xPix - otherDot.origXpix) / otherDot.radiusPix, 2);
            let newOtherError = Math.pow((selfDot.xPix - otherDot.origXpix) / otherDot.radiusPix, 2);
			let newSelfError = Math.pow((otherDot.xPix - selfDot.origXpix) / selfDot.radiusPix, 2);
			let newError = newSelfError + newOtherError;
            if(
				// check whether it would improve the current situation
				newError < (selfError + otherError)
				// check whether it's the best we can do
				&& newError < bestError
			) {
                bestError = newError;
                bestSwapIndex = j;
            }
        }
		
        if(bestSwapIndex >= 0){
            swapCount++;
			
			// swap X
			let tempPos = selfDot.xPix;
			selfDot.xPix = circleData[bestSwapIndex].xPix;
			circleData[bestSwapIndex].xPix = tempPos;
			// swap Y
			tempPos = selfDot.yPix;
			selfDot.yPix = circleData[bestSwapIndex].yPix;
			circleData[bestSwapIndex].yPix = tempPos;
			
			// swap position in list
			circleData[i] = circleData[bestSwapIndex];
			circleData[bestSwapIndex] = selfDot;
			
			// we might have swapped with a dot that hasn't been looked at before.
			// do nto advance to the next index without taking another look at the new dot in the current index.
            i--;
        }
    }
}

/** update position of cells */
function updateCells(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam, delaunay): RelaxStatus{
    // for each dot a moment
    let moments: Moments = {};
    let circlePixel: CirclePixel = {};
    let pixelX: number;
    let pixelY: number;
    let density: number;
    let pointDist: number, originDist: number;
    let densityMultiplier: number;

    let nearestCircle: Circle;

    let newCirclePosPix: Coords = {x:0, y:0}

    // vars for stop check
    let relaxStatus: RelaxStatus = {
        sumDotMove: 0
        ,squaredSumDotMove: 0
        ,sumSquaredError: 0
        // ,sumDiameterOverlap: 0
        // ,densityDeviation: 0
    };


    //let xDiff: number;
    //const MAX_X_PUSH = 1;

    let densValues = [];
    let pixel: PixelMapEntry;
    for(let i = 0; i < plotParam.supSampWidth; i++){
        // kde needs a domain value, and gives a domain value back
        densValues[i] = inputConfig.dots.dotscaling.scaleDensityDom(plotParam.kde(plotParam.xAxisScale.invert((i+0.5)/inputConfig.relaxing.supSampFactor)), inputConfig.dots.dSingle) * plotParam.domainToPixel * inputConfig.relaxing.supSampFactor;
    }

    // iterate over all pixels
    for (let index = 0; index < plotParam.supSampHeight * plotParam.supSampWidth; index++) {
        // current pixel values
        pixelX = (index % plotParam.supSampWidth) + 0.5;
        pixelY = Math.floor(index / plotParam.supSampWidth) + 0.5;
        // get pixel from Delaunay
        pixel = {dotKey: delaunay.find(pixelX, plotParam.supSampHeight-pixelY)};
        
        nearestCircle = circleData[pixel.dotKey];
        pointDist = Math.sqrt(Math.pow(pixelX-nearestCircle.xPix, 2) + Math.pow(pixelY-nearestCircle.yPix, 2));
        originDist = nearestCircle.origXpix - pixelX;
        switch(inputConfig.relaxing.xCorrectionType){
            case "linearArea":
                densityMultiplier = Math.max(0,(nearestCircle.radiusPix - Math.abs(originDist))/nearestCircle.radiusPix);
            case "circleArea":
                densityMultiplier = kernel.circleArea().kernelFunction(originDist, nearestCircle.radiusPix);
            case "force":
            default:
                densityMultiplier = 1;
        }
        density = (pixelY > densValues[index % plotParam.supSampWidth]) ? 0 : densityMultiplier;

        if (moments[pixel.dotKey] === undefined) {
            moments[pixel.dotKey] = {
                moment00: density
                ,moment01: pixelY * density
                ,moment10: pixelX * density
            }
        } else {
            moments[pixel.dotKey].moment00 += density;
            moments[pixel.dotKey].moment01 += pixelY * density;
            moments[pixel.dotKey].moment10 += pixelX * density;
        }

        if(pointDist < nearestCircle.radiusPix*(1.0-inputConfig.dots.circlePadding)){
            if (nearestCircle === undefined) {
                circlePixel[pixel.dotKey] = density;
            } else {
                circlePixel[pixel.dotKey] += density;
            }
        }
    };

    let densityArray: number[] = [];
    let densityAverage: number;
    let lostMoments = 0;
    let overlapDistance: number;
    let circle: Circle;
    for (let index = 0; index < circleData.length; index++) {
        circle = circleData[index];

        if (moments[index] === undefined){
            if(lostMoments < 100){
                console.log("Undefined Moment from key " + index);
                lostMoments++;
            }
            continue;
        }
        if (moments[index].moment00 != 0) {
            newCirclePosPix.y = moments[index].moment01 / moments[index].moment00;
            if(inputConfig.relaxing.xCorrectionType != "force"){
                newCirclePosPix.x = (moments[index].moment10 / moments[index].moment00);
            }else{
                const correctPart = circle.origXpix * inputConfig.relaxing.xCorrection;
                const centroidPart = (moments[index].moment10 / moments[index].moment00) * (1.0 - inputConfig.relaxing.xCorrection);
                newCirclePosPix.x = centroidPart + correctPart;
            }
            // calculate movement of the circle
            relaxStatus.sumDotMove += Math.sqrt( (circle.xPix-newCirclePosPix.x)*(circle.xPix-newCirclePosPix.x) + (circle.yPix-newCirclePosPix.y)*(circle.yPix-newCirclePosPix.y) ) / circle.radiusPix;
            // relaxStatus.sumDotMove += Math.sqrt( (circle.xPix-newCirclePosPix.x)*(circle.xPix-newCirclePosPix.x) + (circle.yPix-newCirclePosPix.y)*(circle.yPix-newCirclePosPix.y) ) / getPadRadFunct(inputConfig)(circle.radiusPix);
            relaxStatus.squaredSumDotMove += relaxStatus.sumDotMove * relaxStatus.sumDotMove;
            // calculate error of new position
            circle.xPix = newCirclePosPix.x;
            circle.yPix = newCirclePosPix.y;
        }
        // Checks for the colorMode and recolors circles
        const currentDiff = (circle.xPix/inputConfig.relaxing.supSampFactor - circle.origXpix/inputConfig.relaxing.supSampFactor);
        if(currentDiff > 0){
            circle.errorColor = "#" + (Math.min(Math.round(currentDiff * inputConfig.relaxing.errorScale), 255)<<16).toString(16).padStart(6, "0");
        }else{
            circle.errorColor = "#" + Math.min(Math.round(Math.abs(currentDiff * inputConfig.relaxing.errorScale)), 255).toString(16).padStart(6, "0");
        }

        density = circlePixel[index]/moments[index].moment00;
        densityArray.push(density);
        circle.coverageColor = "#" + (Math.min(Math.round(density*255), 255)*256*256).toString(16).padStart(6, "0");
        // placing error
        relaxStatus.sumSquaredError += Math.pow(((circle.origXpix - newCirclePosPix.x) / getPadRadFunct(inputConfig)(circle.radiusPix)), 2);

        
    }

    // densityAverage = d3.sum(densityArray)/circleData.size;

    // plot dens average if coverage color is activated
    if(inputConfig.relaxing.colorMode === "coverage"){
        console.log("Average Relative Density: " + d3.sum(densityArray)/circleData.length);
    }

    // // calculate the difference between average density and dnesity of each circle
    // densityArray.forEach(density => {
    //     stipplStatus.densityDeviation += (density - densityAverage) * (density - densityAverage)
    // });

    // returns stipplStatus for stop
    return relaxStatus;
}