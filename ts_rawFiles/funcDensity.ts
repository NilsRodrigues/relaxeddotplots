/**
Calculates and draws the density of given data on points in xTicks, regarding to attribues in inputConfig. Also adds a new x value to bve considered in the calc, if it's not null
*/
function calculateDrawDensity(inputConfig: InputConfig, inputData: InputData, circleData: CircleData, xDomSample: number[], densityPlot: any, plotParam: PlotParam): DensityReturn {
    let kdeInput = getKDEinputFromCircleData(circleData);
    // Array with x-values and corresponding density
    let discreteDens: DensPoint[];

    plotParam.kde = getKDE(inputConfig, kdeInput, xDomSample);
    plotParam.boundaryList = getBoundaryList(inputConfig, inputData, plotParam.kde);
    if (inputConfig.density.useBoundary) {
        // pick original KDE or bounded KDE
        plotParam.kde = getBoundedKDE(inputConfig, kdeInput, xDomSample, plotParam.boundaryList);
    }
    // recompute density estimation
    discreteDens = getDiscreteDensity(inputConfig, plotParam.kde, xDomSample)
    drawDensity(discreteDens, densityPlot, plotParam)
    return discreteDens
}




/**
    input for KDE calculation from circleData
*/
function getKDEinputFromCircleData(circleData: CircleData): KDEinput {
    return circleData.map((circle) => {
        return { xDom: circle.origXdom, radiusPix: -1 };
    });
}

/**
    input for KDE calculation from inputData
*/
function getKDEinputFromInputData(inputConfig: InputConfig, inputData: InputData): KDEinput {
    return inputData.map((dataObject) => {
        return { xDom: dataObject[inputConfig.xAttribute], radiusPix: -1 };
    });
}


/**
Computes density values at certain points, given by xTicks
*/
function getDiscreteDensity(inputConfig: InputConfig, kde: KDE, xDomSample: number[]): DensPoint[] {
    return xDomSample.map((xDom) => {
        let densityDom: number = kde(xDom);
        // changes the density value depending on the non linear calculation
        densityDom = inputConfig.dots.dotscaling.scaleDensityDom(densityDom, inputConfig.dots.dSingle);

        // cut the density at the height so that the polygon will still work
        //if (densityDom > maxHeight) maxHeight = densityDom;

        // scaling of density
        return { xDom: xDom, densityDom: densityDom };
        //return [x, densityHeight];
    });

}


/**
    returns KDE calculator that can calc the dens for any point on the x-axis
 */
function getKDE(inputConfig: InputConfig, kdeInput: KDEinput, xDomSample: number[] = []): KDE {
    return (xDom: number) => {
        let densityDom: number;
        densityDom = d3.sum(kdeInput.map(currentPoint => inputConfig.density.kernel.kernelFunction(xDom - currentPoint.xDom, inputConfig.density.bandwidth)));
        return densityDom;
    };
}

/** get KDE that watches for the boundary*/
function getBoundedKDE(inputConfig: InputConfig, kdeInput: KDEinput, xDomSample: number[] = [], boundaryList: BoundaryList): KDE {

    // dot ranges divided by a boundary are handled individually, so we split data into these parts
    let boundBox: KDEinput = [];
    let bondaryIndex = 1;

    let kdeCollection: KDE[] = [];

    kdeInput = sortKDEinput(kdeInput);

    for (const dot of kdeInput) {
        // split kde Input into bins split by bounary.
        // only look at right side of boundary
        if (dot.xDom > boundaryList[bondaryIndex].xDom) {
            // make next box

            kdeCollection.push(getKDE(inputConfig, boundBox, xDomSample));

            boundBox = [];
            bondaryIndex += 2;
        }
        boundBox.push(dot);

    }

    // make KDE with rest
    kdeCollection.push(getKDE(inputConfig, boundBox, xDomSample));

    return (xDom: number) => {
        let value: number;
        let leftBoundary: BoundaryEntry;
        let rightBoundary: BoundaryEntry;

        // finding the boundaries surrounding point
        let index: number;
        for (index = 0; index < boundaryList.length; index++) {
            if (boundaryList[index].xDom > xDom) break;
        }

        // xDom is more left or more right than data
        if (index === 0 || index >= boundaryList.length) return 0;

        leftBoundary = boundaryList[index - 1];
        rightBoundary = boundaryList[index];

        // xDom is within a gap of data
        if (leftBoundary.isRight) return 0;

        let leftDist = xDom - leftBoundary.xDom;
        let rightDist = rightBoundary.xDom - xDom;

        // get kde of that boundary Box
        let kdeIndex = Math.floor(index / 2);
        let kde = kdeCollection[kdeIndex];

        value = kde(xDom);

        // add the value otside of the boundary to the oringnal KDE
        if (leftDist < inputConfig.density.bandwidth) value += kde(leftBoundary.xDom - leftDist);
        if (rightDist < inputConfig.density.bandwidth) value += kde(rightBoundary.xDom + rightDist);
        //console.log(xDom + ": " + kde(xDom) + " " + value);

        return value;
    }

}




/**
callculates a complete new density and redraws the plot
and returns the used density
*/
function drawDensity(discreteDens: DensPoint[], densityPlot: any, plotParam: PlotParam) {
    let line = d3.line()
        .curve(d3.curveLinear)
        .x((density: DensPoint) => { return plotParam.xAxisScale(density.xDom); })
        .y((density: DensPoint) => { return plotParam.yAxisScale(density.densityDom); })

    densityPlot
        // .datum(discreteDens.filter((x)=>{return (x.densityDom > 0)}))
        // .data(discreteDens)
        // .transition()
        // .duration(250)
        // .style("opacity", "0")
        // .style("stroke", "rgb(252, 14, 89)") // make red
        .attr("d", line(discreteDens))
}


/**
    creates a special version of ticks on the xAxis with the first and the last point def inside
*/
function getXdomSample(sampleRate: number, plotParamKDE: PlotInfosKDE) {
    //console.log(xDomain);

    let xTicks = [plotParamKDE.xDomain[0]];
    xTicks = xTicks.concat(plotParamKDE.xAxisScale.ticks(sampleRate));
    xTicks.push(plotParamKDE.xDomain[1]);
    return xTicks;
}


/**
returns a function to get the padded radius of a circle.
*/
function getPadRadFunct(inputConfig: InputConfig) {
    return (radius: number) => radius * (1 - inputConfig.dots.circlePadding);
}


/**returns the list of boundarys for density plotting*/
function getBoundaryList(inputConfig: InputConfig, inputData: InputData, kde: KDE): BoundaryList {

    let boundaries: BoundaryList = [];

    let currentPoint: number;
    let nextPoint: number;
    let distance: number;
    let radiusDom: number;

    let currentRadiusDom: number;
    let nextRadiusDom: number;

    // first dot gives a left boundary

    radiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(inputData[0][inputConfig.xAttribute]), inputConfig.dots.dSingle) / 2;

    boundaries.push({
        xDom: inputData[0][inputConfig.xAttribute] - radiusDom
        , isRight: false
    });

    for (let index = 0; index < inputData.length - 1; index++) {
        currentPoint = inputData[index][inputConfig.xAttribute];
        nextPoint = inputData[index + 1][inputConfig.xAttribute];
        distance = nextPoint - currentPoint;

        // Distance is big enough for boundaries
        if (distance > inputConfig.dots.dSingle) {

            currentRadiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(currentPoint), inputConfig.dots.dSingle) / 2;
            nextRadiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(nextPoint), inputConfig.dots.dSingle) / 2;
            // no boundary if circles collide with each other
            if ((currentRadiusDom + nextRadiusDom) > distance) continue;

            boundaries.push({
                xDom: currentPoint + currentRadiusDom
                , isRight: true
            });

            boundaries.push({
                xDom: nextPoint - nextRadiusDom
                , isRight: false
            });
        }
    }

    // last dot gives right boundary
    radiusDom = inputConfig.dots.dotscaling.scaleDensDiamDom(kde(inputData[inputData.length - 1][inputConfig.xAttribute]), inputConfig.dots.dSingle) / 2;
    boundaries.push({
        xDom: inputData[inputData.length - 1][inputConfig.xAttribute] + radiusDom
        , isRight: true
    });
    // inputData.reverse;
    // console.log(boundaries);

    return boundaries;
}







