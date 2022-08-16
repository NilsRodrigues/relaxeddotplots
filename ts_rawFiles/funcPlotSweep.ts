/**
Receives inputData, inputConfig, hasColor, docHeight and the docWidth as input.
Calculates container width, height and aspectRatio.
Loops calculation of the doubleSweep function
and changing of dSingle value for custom aspectRatio.
*/
function createPlotParamters(inputConfig: InputConfig, inputData: InputData, hasColor: boolean, docHeight: string, docWidth: string): PlotParam {

    // End height and weight
    let height: number;
    let width: number;
    // height of the xAxis in pixel (numbers and line)
    const X_AXIS_HEIGHT: number = 34;

    // given container Height and width
    let containerHeight: number;
    let containerWidth: number;
    let containerRatio: number;

    // helper for custom Ratio calculation
    let hasLowerBoundary: boolean = false;
    let lowerBoundary: number;
    let hasUpperBoundary: boolean = false;
    let upperBoundary: number;
    let heightDifference: number;
    let aspectRatioDifference: number;
    let bestResult: BestRatioResult = {
        dSingle: 0
        , aspectRatioDifference: -1
    };

    // Closness for calculated aspectRatio with custom aspectRatio
    const EPSILON: number = 0.001;
    // if after search for aspectratio the value is not good enough repeat whole process x times
    const REPEAT_AMOUNT: number = 1;
    // number of iterations in current run
    let iterIndex: number = 0;
    // number of the run for repeat check
    let runIndex: number = 0;

    // Domain variables
    let xDomain: Domain = [0, 0];
    let yDomain: Domain = [0, 0];


    let domainWidth: number;
    let heightToOne: number;

    // Axis scales
    let xAxisScale: any;
    let yAxisScale: any;


    // double-sweep variables
    let sweepResult: DoubleSweepResult;
    let columns: Column[];
    let highestColumn: number;
    let colorNames: ColorName[];
    let firstRound: boolean = true;
    let lastRound: boolean = false;

    let boundaryList: BoundaryList;
    // array with xValues for KDE sampling
    let xDomSample: number[];
    // helper plotParam with less entries
    let plotParamKDE: PlotInfosKDE;
    let kdeInput: KDEinput;
    let kde: KDE;

    // recompute density estimation
    let densMax: number;

    let sweepTime: number;


    /*prepare plot container width and height*/
    //if container has invalid height and width use domain width.
    if ((docWidth === "" && docHeight === "") ||
        (isNaN(parseInt(docWidth)) &&
            isNaN(parseInt(docHeight)))) {
        // send warning too
        containerWidth = inputData[(inputData.length - 1)][inputConfig.xAttribute] - inputData[0][inputConfig.xAttribute];
        console.warn("Neither valid height nor width was found. Used domain width of " + containerWidth + " as container width.");
    } else {
        // one can be NaN
        containerWidth = parseInt(docWidth);
        containerHeight = parseInt(docHeight);
    }



    //change container to custom aspectRatio (given sides are boundary)
    if (inputConfig.aspect.ratio > 0) {


        if ((containerWidth / containerHeight) > inputConfig.aspect.ratio || isNaN(containerWidth)) { 
            containerHeight -= inputConfig.margin + X_AXIS_HEIGHT;
            // height stays, reduce width
            containerWidth = inputConfig.aspect.ratio * containerHeight;
        } else if ((containerWidth / containerHeight) < inputConfig.aspect.ratio || isNaN(containerHeight)) {
            containerWidth -= (2 * inputConfig.margin);
            // width stays, reduce height
            containerHeight = containerWidth / inputConfig.aspect.ratio;
        }
    }

    //substract padding and calculate current Container Ratio
    
    
    containerRatio = 1 / inputConfig.aspect.ratio;
    


    // If margin is too big graph can't be drawn
    if (containerHeight <= 0 || containerWidth <= 0) {
        throw new Error("A margin of " + inputConfig.margin + " is too big to draw a graph in the Container. Either increase container size or decrease margin!");
    }

    /* container for the plot is DONE */


    kdeInput = getKDEinputFromInputData(inputConfig, inputData);
    // get bounded KDE (and normal KDE) for domain width
    kde = getKDE(inputConfig, kdeInput, xDomSample);
    boundaryList = getBoundaryList(inputConfig, inputData, kde);
    if (inputConfig.density.useBoundary) {
        // pick original KDE or bounded KDE
        kde = getBoundedKDE(inputConfig, kdeInput, xDomSample, boundaryList);
    }
    


    /* Calculate xDomain from the boundaries */
    if (inputConfig.density.useBoundary) {
        xDomain[0] = boundaryList[0].xDom;
        xDomain[1] = boundaryList[boundaryList.length - 1].xDom;
    } else {
        xDomain[0] = inputData[0][inputConfig.xAttribute] - inputConfig.density.bandwidth;
        xDomain[1] = inputData[inputData.length - 1][inputConfig.xAttribute] + inputConfig.density.bandwidth;
    }
    
    xDomain = addPaddingToDomain(xDomain);
    domainWidth = xDomain[1] - xDomain[0];



    // plotParam excerpt to be put into xDomSample
    plotParamKDE = {
        xDomain: xDomain
        , xAxisScale: d3.scaleLinear()
            .range([0, 1])
            .domain(xDomain)
    }
    // get a sample of xDom values to calculate the highest point in the KDE.
    xDomSample = getXdomSample(inputConfig.density.sampleRate <= 0 ? containerWidth : inputConfig.density.sampleRate, plotParamKDE);
    densMax = Math.max(...getDiscreteDensity(inputConfig, kde, xDomSample).map((a) => { return a.densityDom }));

    // loop for custom ratio calculating (only runs once with no custom aspectRatio)
    do {
        // check if last Round (with iterations and epsilon)
        if (inputConfig.aspect.ratio > 0) {
            // Last round is: enough iterations OR bestResult is below Epsilon level AND we have at least gotten one result
            lastRound = (iterIndex > inputConfig.aspect.iter) || (bestResult.aspectRatioDifference <= EPSILON && !(bestResult.aspectRatioDifference < 0));
        }

        if (lastRound) {
            // if iterations not enough
            if (inputConfig.aspect.ratio > 0) {
                
                // if user didn't give his own bandwidth
                if (inputConfig.density.dSingleBandwidth) {
                    inputConfig.density.bandwidth = bestResult.dSingle;
                }
                // use best dSingle
                inputConfig.dots.dSingle = bestResult.dSingle;

                //update xDomain because bandwidth changed
                if (inputConfig.density.useBoundary) {
                    xDomain[0] = boundaryList[0].xDom;
                    xDomain[1] = boundaryList[boundaryList.length - 1].xDom;
                } else {
                    xDomain[0] = inputData[0][inputConfig.xAttribute] - inputConfig.density.bandwidth;
                    xDomain[1] = inputData[inputData.length - 1][inputConfig.xAttribute] + inputConfig.density.bandwidth;
                }
                xDomain = addPaddingToDomain(xDomain);
                domainWidth = xDomain[1] - xDomain[0];

                // warn if iterations seem too few
                if ((!hasLowerBoundary || !hasUpperBoundary) && bestResult.aspectRatioDifference > EPSILON) {
                    console.warn(inputConfig.aspect.iter + " Iteration(s) might not be sufficient to get aspectRatio of: " + inputConfig.aspect.ratio);
                }

                // fixes changing plot during re-generation, by resetting the boundarys if diffrence is too small.
                if (bestResult.aspectRatioDifference > EPSILON && runIndex < REPEAT_AMOUNT) {
                    lastRound = false;
                    hasLowerBoundary = false;
                    hasUpperBoundary = false;
                    iterIndex = 0;
                    runIndex++;
                }

            }
        }

        // get bounded KDE (and normal KDE)
        kde = getKDE(inputConfig, kdeInput, xDomSample);
        boundaryList = getBoundaryList(inputConfig, inputData, kde);
        if (inputConfig.density.useBoundary) {
            // pick original KDE or bounded KDE
            kde = getBoundedKDE(inputConfig, kdeInput, xDomSample, boundaryList);
        }
        
        // highest density
        densMax = Math.max(...getDiscreteDensity(inputConfig, kde, xDomSample).map((a) => { return a.densityDom }));

        sweepTime = Date.now(); 
        //SweepAlgo with output: columns, highestColumn, colorNames
        sweepResult = doubleSweep(inputConfig, inputData, (hasColor && firstRound), kde, densMax);
        columns = sweepResult.columns;
        highestColumn = sweepResult.highestColumn;
        sweepTime = Date.now() - sweepTime;
        
        inputConfig.extraInfo.sweepRuntime = sweepTime;
        // sweepResult.highestColumnHeightDom = densMax;


        if (hasColor && firstRound) {
            // save colorNames only in first Round
            colorNames = sweepResult.colorNames;
        }
        // first Round over
        firstRound = false;


        // Calculate current aspectratio of graph
        heightToOne = (1 / domainWidth) * sweepResult.highestPlotPointDom;
        //heightToOne = (1 / domainWidth) * dotscale.scaleDensity(kde(highestColumn));


        if (inputConfig.aspect.ratio > 0 && !lastRound) {
            //pseudo container created with, width, height and ratio
            width = containerWidth;
            height = (width * heightToOne);

            heightDifference = height - containerHeight;
            aspectRatioDifference = Math.abs((height / width) - containerRatio);

            // save best height difference and dSingle
            if (aspectRatioDifference < bestResult.aspectRatioDifference || bestResult.aspectRatioDifference < 0) {
                bestResult.aspectRatioDifference = aspectRatioDifference;
                bestResult.dSingle = inputConfig.dots.dSingle;
                // if user didn't give his own bandwidth
                if (inputConfig.density.dSingleBandwidth) {
                    inputConfig.density.bandwidth = bestResult.dSingle;
                }
                // update xDomain because bandwidth changed
                // maybe fixes diffrent plot gen problem if it comes up
                if (inputConfig.density.useBoundary) {
                    xDomain[0] = boundaryList[0].xDom;
                    xDomain[1] = boundaryList[boundaryList.length - 1].xDom;
                } else {
                    xDomain[0] = inputData[0][inputConfig.xAttribute] - inputConfig.density.bandwidth;
                    xDomain[1] = inputData[inputData.length - 1][inputConfig.xAttribute] + inputConfig.density.bandwidth;
                }
                xDomain = addPaddingToDomain(xDomain);
                domainWidth = xDomain[1] - xDomain[0];
            }

            //perfect fit
            if (heightDifference === 0) {
                break;
                //too small
            } else if (heightDifference < 0) {
                hasLowerBoundary = true;
                lowerBoundary = inputConfig.dots.dSingle;
                if (hasUpperBoundary) {
                    // arithm. middle between old and new dSingle
                    inputConfig.dots.dSingle = (upperBoundary + inputConfig.dots.dSingle) / 2;
                } else {
                    // double if height still didn't reach target value
                    inputConfig.dots.dSingle *= 2;
                }
                //too big
            } else if (heightDifference > 0) {
                hasUpperBoundary = true;
                upperBoundary = inputConfig.dots.dSingle;
                if (hasLowerBoundary) {
                    // arithm. middle between old and new dSingle
                    inputConfig.dots.dSingle = (lowerBoundary + inputConfig.dots.dSingle) / 2;
                } else {
                    // halve if height still didn't reach target value
                    inputConfig.dots.dSingle /= 2;
                }

            }

            iterIndex++;
        }
    } while (inputConfig.aspect.ratio > 0 && !lastRound);

    // dSingle found / already given

    // calculates height and width, so graph fits
    if (containerRatio === heightToOne) {
        // both are equal container
        width = containerWidth;
        height = containerHeight;
    } else if (containerRatio > heightToOne || isNaN(containerHeight)) {
        // width is equal container (or no height given)
        width = containerWidth;
        height = heightToOne * width;
        //console.log("height change");
        // if calculation error occured and graph doesn't fit, take other method
        if (Math.floor(height) > containerHeight) {
            //console.log("height change BAD");
            height = containerHeight;
            width = height / heightToOne;
        }
    } else {
        // height is equal container (or no width given)
        height = containerHeight;
        width = height / heightToOne;
        //console.log("width change");
        // if calculation error occured and graph doesn't fit, take other method
        if (Math.floor(width) > containerWidth) {
            //console.log("width change BAD");
            width = containerWidth;
            height = heightToOne * width;
        }
    }



    // standart density samplerate. Uses width in pixel as start.
    if (inputConfig.density.sampleRate <= 0) {
        inputConfig.density.sampleRate = width;
        //sampleRate = width * inputConfig.xTicksFactor;
    };

    /* Calculate yDomain. From pixel to domain value */
    yDomain = [0, (height * (domainWidth / width))];

    // axis scales:
    xAxisScale = d3.scaleLinear()
        .range([0, width])
        .domain(xDomain)

    yAxisScale = d3.scaleLinear()
        .range([height, 0])
        .domain(yDomain)



    return {
        height: height
        , width: width
        , xDomain: xDomain
        , xDomainWidth: domainWidth
        , yDomain: yDomain
        , xAxisScale: xAxisScale
        , yAxisScale: yAxisScale
        , columns: columns
        , colorNames: colorNames
        , domainToPixel: (width / domainWidth)
        , xAxisHeight: X_AXIS_HEIGHT
        , boundaryList: boundaryList
        , kde: kde
        , updateTextures: true
        , padRadFunct: getPadRadFunct(inputConfig)
    }

}




/**
Receives inputData, inputConfig and checkColor as input.
Performs the double sweep algorithm with already sorted data
Further details algorithm: 
Nonlinear Dot Plots, Rodrigues and Weiskopf
*/
function doubleSweep(inputConfig: InputConfig, inputData: InputData, checkColor: boolean, kde: KDE, densMax: number): DoubleSweepResult {

    // upscale data if neccecary
    let sweepData = upscaleSweepInput(inputConfig, inputData, false);
    
    // let olddSingle = inputConfig.dots.dSingle;
    // inputConfig.dots.dSingle = sweepData.dSingleSweep;

    // 1. right to left sweep (inputData is in DESCENDING order now)
    sweepData.inputDataSweep = [...sweepData.inputDataSweep].reverse();

    let columns: Column[] = [];
    let colorNames: ColorName[] = [];
    // column attributes
    let xPos: number = sweepData.inputDataSweep[0][inputConfig.xAttribute];
    let c: number = 0;
    let diameter: number;
    // helper for testing xAttribute
    let itemType: string;

    /* PART TWO*/
    // for height calculation later
    let highestColumn: number = 0;
    // to iterate through 
    let colIndex: number = 0;
    // overflow during combining
    let overflow: boolean = false;
    let cTemp: number;

    
    // inputConfig.dotscaling.scaleDensDiamDom(kde(dataPoint[inputConfig.xAttribute]), inputConfig.dSingle);
    let kdeHeightDom: number = 0;

    let highestPlotPointDom: number;

    sweepData.inputDataSweep.forEach((dataPoint, index) => {
        //extracts the different colorNames, only on the first sweep
        if (checkColor) {
            if (!colorNames.includes(dataPoint[inputConfig.color.attribute])) {
                colorNames.push(dataPoint[inputConfig.color.attribute]);
            }
        }
        //checks if xAttribute is always a number
        itemType = typeof dataPoint[inputConfig.xAttribute];
        if (itemType != 'number') {
            throw new Error("Value \"" + dataPoint[inputConfig.xAttribute] + "\" for xAtrribute  \"" + inputConfig.xAttribute + "\"  in the JSON-Object with Index \"" + index + "\" should be a number, is " + itemType);
        } else if (isNaN(dataPoint[inputConfig.xAttribute])) {
            throw new Error("Value \"" + dataPoint[inputConfig.xAttribute] + "\" for xAtrribute  \"" + inputConfig.xAttribute + "\"  in the JSON-Object with Index \"" + index + "\" should be a number, is NaN");
        }


        // current Item is always in Column
        c++;
        // modifies dSingle with given dotscale for the old column diameter
        diameter = inputConfig.dots.dotscaling.columnToDiamDom(c, sweepData.dSingleSweep);
        // last point in inputData check
        if (index < (sweepData.inputDataSweep.length - 1)) {
            // Point distance sufficient for new column
            if (Math.abs(nextX(index) - xPos) > diameter) {
                // save Column
                columns.push({
                    xPos: xPos
                    , c: c
                    // diameter only saved after second sweep
                    , colDiameterDom: -1
                    // start index of the column on inputData
                    , startIndex: -1
                });
                // reset var
                xPos = nextX(index);
                c = 0;
                diameter = sweepData.dSingleSweep;

                
            }
        } else {
            // save last column
            columns.push({
                xPos: xPos
                , c: c
                // diameter only saved after second sweep
                , colDiameterDom: -1
                // start index of the column on inputData
                , startIndex: -1
            });
        }
        
    });
    
    // reversing both arrays for left to right sweep
    columns.reverse();    
    
    sweepData.inputDataSweep = [...sweepData.inputDataSweep].reverse();
    
    // 2. left to right sweep with combining (inputData is in ASCENDING order)
    xPos = sweepData.inputDataSweep[0][inputConfig.xAttribute];
    c = 0;
    
    
    // console.log([...columns]);
    
    sweepData.inputDataSweep.forEach((dataPoint, index) => {
        
        
        // current Item is always in Column
        c++;
        
        // modifies dSingle with given f
        diameter = inputConfig.dots.dotscaling.columnToDiamDom(c, sweepData.dSingleSweep);
        // last point in inputData check
        if (index < (sweepData.inputDataSweep.length - 1)) {
            
            // Point distance sufficient for new column
            
            if (Math.abs(nextX(index) - xPos) > diameter) {
                // combine both sweeps
                //xPos
                columns[colIndex].xPos = (columns[colIndex].xPos + xPos) / 2;
                
                // c
                cTemp = (columns[colIndex].c + c) / 2;
                // check if decimal for overflow
                if (cTemp % 1 != 0) {
                    if (overflow) {
                        columns[colIndex].c = Math.ceil(cTemp);
                        overflow = false;
                    } else {
                        columns[colIndex].c = Math.floor(cTemp);
                        overflow = true;
                    }
                } else {
                    columns[colIndex].c = cTemp;
                }
                
                // calculate column diameter as an average diameter value
                columns[colIndex].colDiameterDom = inputConfig.dots.dotscaling.columnToDiamDom(columns[colIndex].c, sweepData.dSingleSweep);

                //save highest column
                if (columns[highestColumn].c < columns[colIndex].c) {
                    highestColumn = colIndex;
                }
                // start index of the column on inputData
                // Maybe rather go from the start and count up all prior c
                columns[colIndex].startIndex = index - columns[colIndex].c + 1;

                // reset var
                xPos = nextX(index);
                c = 0;
                diameter = sweepData.dSingleSweep;
                kdeHeightDom = 0;
                colIndex++;
            }

        } else {
            // finalize last column
            //xPos
            columns[colIndex].xPos = (columns[colIndex].xPos + xPos) / 2;
            // c
            cTemp = (columns[colIndex].c + c) / 2;
            if (overflow) {
                columns[colIndex].c = Math.ceil(cTemp);
            } else {
                columns[colIndex].c = cTemp;
            }

            // calculate column diameter as an average diameter value
            columns[colIndex].colDiameterDom = inputConfig.dots.dotscaling.columnToDiamDom(columns[colIndex].c, sweepData.dSingleSweep);

            //save highest column
            if (columns[highestColumn].c < columns[colIndex].c) {
                highestColumn = colIndex;
            }
            // start index of the column on inputData
            columns[colIndex].startIndex = index - columns[colIndex].c + 1;  
        }
    
    });
    function nextX(index: number) {
        return sweepData.inputDataSweep[index + 1][inputConfig.xAttribute];
    }

    // upscale output back to normal
    
    columns = downscaleSweepOutput(columns, sweepData.upscaleFactor);
    
    // get height of the highest column in domain value
    switch (inputConfig.dots.radiusMode) {
        case "column":
            highestPlotPointDom = columns[highestColumn].colDiameterDom * columns[highestColumn].c;
            break;
        case "kde":
            if (inputConfig.relaxing.squichDots) {
                // Relax config puts dots under KDE, so just use KDE height
                highestPlotPointDom = densMax
            } else {
                // calculate real height of plot
                for (let index = columns[highestColumn].startIndex; index < columns[highestColumn].startIndex + columns[highestColumn].c; index++) {
                    kdeHeightDom += inputConfig.dots.dotscaling.scaleDensDiamDom(kde(inputData[index][inputConfig.xAttribute]), inputConfig.dots.dSingle);
                }
                highestPlotPointDom = (densMax > kdeHeightDom) ? densMax : kdeHeightDom;
            }
            break;
        default:
            break;
    }



    let result: DoubleSweepResult = {
        columns: columns
        , highestColumn: highestColumn
        , highestPlotPointDom: highestPlotPointDom
        , colorNames: colorNames
    }
    return result;
}

/**
    Upscales data if dSingle smaller than 1 
*/
function upscaleSweepInput(inputConfig:InputConfig, inputData: InputData, withUpscale:boolean = false): UpscaledSweepInput {
    // if dSingle bigger than 1 no upsaling neccecary
    if (inputConfig.dots.dSingle >= 1 || !withUpscale) {
        return {
            upscaleFactor: 1
            ,dSingleSweep: inputConfig.dots.dSingle
            ,inputDataSweep: inputData
        }
    }
    // factor to multiply dSingle with for upscaling
    let upscaleFactor: number = 1 / inputConfig.dots.dSingle;
    let inputDataSweep: InputData;

    
    // deep copy of the input data object
    inputDataSweep = inputData.map(obj => {
        let newObj = Object.assign({},obj);
        newObj[inputConfig.xAttribute] *= upscaleFactor;
        return newObj;
    });

    

    return {
        upscaleFactor: upscaleFactor
        ,dSingleSweep: 1
        ,inputDataSweep: inputDataSweep
    }
}

/**
    revert upscaling
*/
function downscaleSweepOutput(columns: Column[], upscaleFactor: number): Column[]{
    
    if (upscaleFactor === 1) {
        return columns;
    }

    // downscale position and diameter
    let newColumn = columns.map(column => {
        let newColumn = Object.assign({},column);
        newColumn.colDiameterDom /= upscaleFactor;
        newColumn.xPos /= upscaleFactor;
        return newColumn;
    });

    return newColumn;

}








/**
    creates the object for one circle
*/
function newSingleCircle(inputConfig: InputConfig, dataPoint: InputDataObj, diameterDom: number
    , d3RefID: number, xDom: number, yPix: number, plotParam: PlotParam, blur: number, hasColor: boolean): Circle {

    // density for calc of diameter
    let unscaledDens: number;
    let radiusPix: number;
    // color calc
    let color: string;
    // hover text of the circle
    let description: string;

    // from domain to pixel value
    radiusPix = diameterDom / 2 * plotParam.domainToPixel;

    // set color
    if (hasColor) {
        color = plotParam.colors[dataPoint[inputConfig.color.attribute]];
    } else {
        color = inputConfig.color.scale[0].color;
    }

    // set description
    description = JSON.stringify(dataPoint).replace(/{|}|"/g, "").replace(/,/g, "<br/>").replace(/:/g, ":&nbsp;");

    let url = undefined;
    if (inputConfig.images.useImages) {
        // url = getImageURL(dataPoint["FruitType"]);
        // url = getImageURL(dataPoint["Country"]);
        url = getImageURL(dataPoint[inputConfig.images.attribute]);
    }

    return {
        d3RefID: d3RefID
        , URL: url
        , origXdom: dataPoint[inputConfig.xAttribute]
        , origXpix: plotParam.xAxisScale(dataPoint[inputConfig.xAttribute])
        , xPix: plotParam.xAxisScale(xDom)
        // yPix is bottom of the circle, to get middle point we add rad
        , yPix: yPix + radiusPix
        , origColor: d3.lab(color)
        // for Relaxing colering
        , errorColor: "#000000"
        , coverageColor: "#000000"
        //, radiusDom: radiusPix
        , radiusPix: radiusPix
        , desc: description
        , blur: blur
    }
}



/**
Receives inputData, inputConfig, hasColor and finalSweepResult as input.
Determines all necessary parameters for circles
The return value arrayy of circles
*/
function createCircleData(inputConfig: InputConfig, inputData: InputData, hasColor: boolean, plotParam: PlotParam): CircleData {
    
    const SUP_SAMP_MIN = 4;
    // data for drawing
    let circleData: CircleData = [];
    let newCircle: Circle;

    // calculation helper
    let inputDataColumn: InputData;
    let spliceStart: number = 0;
    let columns: Column[] = plotParam.columns;
    // color variables
    let colorNames: ColorName[] = plotParam.colorNames;
    // Blur check variables
    let hasBlur: boolean;
    let edgeDistance: number;
    let colBlurFlag: boolean;
    let gapDistance: number;
    let gapCheckDistance: number;
    let biggerCol: number;
    let smallerCol: number;
    // bottom of new circle
    let yPix: number;
    // blur value
    let blur: number;
    // id of circle for d3 Reference
    let d3RefID = 0;
    let density: number;
    // diameter calc
    let unscaledDens: number;
    let diameterDom: number;
    // squash factor for one column, so that points stay under kde
    let ySquishFactor: number;
    let squishIndex: number = 0;
    let squishEndIndex: number = 0;
    
    // getting the smallest dot diam
    let smallestRadPix = Infinity;

    // finalize colors
    if (hasColor) {
        // Creates color map-object
        plotParam.colors = createColors(colorNames, inputConfig);
    }
    // for each column in the graph
    columns.forEach((oneColumn, columnIndex) => {

        // reset y for each column
        yPix = 0;
        // create array of points from one column
        inputDataColumn = inputData.slice(spliceStart, (spliceStart + oneColumn.c));
        // splice for jsonObjecs to get data from points
        spliceStart += oneColumn.c;

        // is column blurred
        if (columnIndex === (columns.length - 1)) {
            //last collumn
            hasBlur = false;
        } else {
            // picks the more narrow collumn
            if (columns[columnIndex].colDiameterDom >= columns[columnIndex + 1].colDiameterDom) {
                biggerCol = columnIndex;
                smallerCol = columnIndex + 1;
            } else {
                biggerCol = columnIndex + 1;
                smallerCol = columnIndex;
            }
            //neighbour-Check with smaller Collumn
            gapCheckDistance = (inputConfig.blur.gapDistance * columns[biggerCol].colDiameterDom);
            gapDistance = Math.abs(columns[biggerCol].xPos - columns[smallerCol].xPos) - ((columns[biggerCol].colDiameterDom / 2) + (columns[smallerCol].colDiameterDom / 2));

            if (gapCheckDistance > gapDistance) {
                // collision
                if (colBlurFlag && columnIndex != 0) {
                    hasBlur = true;
                } else {
                    hasBlur = false;
                }
                colBlurFlag = true;
            } else {
                // no collision
                hasBlur = false;
                colBlurFlag = false;
            }
        };
        // blurEdge too big
        if (oneColumn.c <= (inputConfig.blur.edge * 2) || (inputConfig.blur.edge < 0)) {
            hasBlur = false;
        };

        //sorts column alternating
        inputDataColumn = sortAlternating(inputDataColumn, inputConfig, hasColor);
        
        // for each point in a column
        inputDataColumn.forEach((dataPoint, pointindex) => {


            blur = -1;
            // set blur
            if (hasBlur) {
                if (pointindex >= inputConfig.blur.edge && pointindex <= (oneColumn.c - inputConfig.blur.edge - 1)) {

                    edgeDistance = Math.min(pointindex - (inputConfig.blur.edge - 1), (oneColumn.c - inputConfig.blur.edge) - pointindex);

                    if (edgeDistance >= (inputConfig.blur.ramp + 1)) {
                        blur = 1;
                    } else {
                        blur = edgeDistance / (inputConfig.blur.ramp + 1);
                    }

                }

            }

            // calculate diameter in domain value
            switch (inputConfig.dots.radiusMode) {
                case "column":
                    diameterDom = inputConfig.dots.dotscaling.columnToDiamDom(oneColumn.c, inputConfig.dots.dSingle);
                    break;
                case "kde":
                    // dot diameter in pixel domain
                    diameterDom = inputConfig.dots.dotscaling.scaleDensDiamDom(plotParam.kde(dataPoint[inputConfig.xAttribute]), inputConfig.dots.dSingle);
                    break;
                default:
                    break;
            }



            newCircle = newSingleCircle(inputConfig
                , dataPoint
                , diameterDom
                , d3RefID++
                , oneColumn.xPos
                , yPix
                , plotParam
                , blur
                , hasColor);

            // set yValue according to a collumn for initial placement
            yPix += newCircle.radiusPix * 2;
            // console.log(newCircle);

            circleData.push(newCircle);
        });

        if (inputConfig.relaxing.squichDots) {
            density = inputConfig.dots.dotscaling.scaleDensityDom(plotParam.kde(oneColumn.xPos), inputConfig.dots.dSingle) * plotParam.domainToPixel;
            ySquishFactor = density / yPix;
            // iterates over circles of the current column to squash their y value below Density
            squishEndIndex += oneColumn.c;
            for (; squishIndex < squishEndIndex; squishIndex++) {
                circleData[squishIndex].yPix *= ySquishFactor;
                smallestRadPix = (smallestRadPix < circleData[squishIndex].radiusPix) ? smallestRadPix : circleData[squishIndex].radiusPix;
            }
            
            
        }
       
    });

    // set supersampling factor
    inputConfig.relaxing.supSampFactor = Math.max(SUP_SAMP_MIN, Math.ceil(1/smallestRadPix));



    return circleData;
}