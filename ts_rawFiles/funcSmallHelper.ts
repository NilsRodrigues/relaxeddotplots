/* Sorting of Input Data */

/** 
    Sorts inputData according to images
*/
function sortImage(inputDataSlice: InputData, inputConfig: InputConfig, rng: RNG): InputData {
    // Sorts the input by image order  in __ASCENDING__ order
    function sortFunktionImage(a: InputDataObj, b: InputDataObj) {
        let sortHelp = imageList[a[inputConfig.images.attribute]].order - imageList[b[inputConfig.images.attribute]].order;
        // If both are equal randomize the switch
        if(rng() < 0.5){
            return sortHelp === 0 ? -1 : sortHelp;
        }
        return sortHelp === 0 ? 1 : sortHelp;
    };
    inputDataSlice.sort(sortFunktionImage);
    return inputDataSlice;
}

/**

    Sorts inputData according to the x attribute in ascending order.
*/
function sortX(inputData: InputData, xAttribute: string | number): any[] {
    // Sorts the input by xAttribute in __ASCENDING__ order
    function sortFunktionX(a: any, b: any) {
        let sortHelp = a[xAttribute] - b[xAttribute];
        // If both are equal don't switch (a 0 apparently switches them)
        return sortHelp === 0 ? -1 : sortHelp;
    };
    inputData.sort(sortFunktionX);
    return inputData;
}

/**
    Sorts the special input for a KDE
*/
function sortKDEinput(kdeInput: KDEinput): KDEinput {
    // Sorts the input by xAttribute in __ASCENDING__ order
    function sortFunktionX(a: any, b: any) {
        let sortHelp = a.xDom - b.xDom;
        // If both are equal don't switch (a 0 apparently switches them)
        return sortHelp === 0 ? -1 : sortHelp;
    };
    kdeInput.sort(sortFunktionX);
    return kdeInput;
}


/**
The inputData is assumed to be a slice representing a column.
The column is divided into bins with independent sorting (e.g. different colors or Images)
Then each bin is sortet alternating: smallest, biggest, second-to-smallest, etc.
Receives inputData and inputConfig as input.
Returns inputData sorted for color but alternating in value within each bin
*/
function sortAlternating(inputDataSlice: InputData, inputConfig: InputConfig, hasColor: boolean): any[] {
    // the array should be sorted by x already, so no need for extra sort
    //sortX(array, inputConfig.xAttribute);

    // get a blank dictionary
    let binCollection: BinCollection = {}
    let result: InputData = [];

    let mappedValue: number;
    let keys: number[] = [];

    // helper for alternating sort
    let a: number;
    let b: number;
    let binLength: number;
    let tempResult: InputData;

    // filling the bins with the data
    inputDataSlice.forEach(element => {
        // set grouping depending on if pics or colors are used
        if (hasColor) {
            mappedValue = inputConfig.color.attributeMap(element[inputConfig.color.attribute]);
        } else if (inputConfig.images.useImages){
            mappedValue = imageList[element[inputConfig.images.attribute]].order
        } else {
            // no color or image, so one big bin
            mappedValue = 1;
        }
        
        // chack if mapped value is already in array
        if (!(mappedValue in binCollection)) {
            // add entry to dictionary
            binCollection[mappedValue] = [element];
            // one of the keys
            keys.push(mappedValue);
        } else {
            // add the element to the array
            binCollection[mappedValue].push(element);
        }
    });

    // get the ascending order of keys
    keys.sort();
    
    // sort all entries of each bin in an alternative way
    for (const key of keys) {
        binLength = binCollection[key].length;
        tempResult = [];
        // iterate from both sides
        a = 0
        b = binLength - 1;
        
        while (tempResult.length < binLength) {
            // Push the first element to start form the lowest
            tempResult.push(binCollection[key][a]);

            // skip a push if array has odd length
            if (a !== b) {
                tempResult.push(binCollection[key][b]);
            }
            a++;
            b--;
        }
        // push tempResult on final result
        
        result = result.concat(tempResult);

    }
    return result;
}


/**
Receives inputData and inputConfig as input.
Sorts inputData according to color.attributeMap mapping in ascending order.
*/
function sortColor(inputData: InputData, inputConfig: InputConfig, rng: RNG): any[] {
    // Sorts the input by colorAttribute  in __ASCENDING__ order
    function sortFunktionColor(a: InputDataObj, b: InputDataObj) {
        let sortHelp = inputConfig.color.attributeMap(a[inputConfig.color.attribute]) - inputConfig.color.attributeMap(b[inputConfig.color.attribute]);
        // If both are equal randomize the switch
        if(rng() < 0.5){
            return sortHelp === 0 ? -1 : sortHelp;
        }
        return sortHelp === 0 ? 1 : sortHelp;
    };
    inputData.sort(sortFunktionColor);
    return inputData;
}


/**
Seeded RNG
Mulberry32
*/
function mulberry32(a: number) {
    return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

/** adds an amount of padding to the given Domain */
function addPaddingToDomain(xDomain: Domain): Domain {
    // padding that will be added to the Domain sides (as percentage of the domain width)
    const PADD_PERC: number = 0.005;

    let domainWidth = xDomain[1] - xDomain[0];
    let sideAbsol = domainWidth * PADD_PERC;
    // add bandwidth and percentage to Domain
    xDomain[0] -= sideAbsol;
    xDomain[1] += sideAbsol;
    return xDomain
}

/**
Extra function for testing that takes a java object (ready to be used by the graph)
a decimal value (0,1] and a boolean that indicates randomness.
it gives out a split of the data at the given percentage
*/
function splitData(inputData: InputData, splitPerc: number, random: boolean = false) {
    if (Object.prototype.toString.call(inputData) != '[object Array]') {
        throw new Error("inputData must be an Array");
    }

    if (random) {
        return inputData.slice(0, (inputData.length * splitPerc));
    }

    return inputData.slice(0, (inputData.length * splitPerc));
}

// helper to easily create the object to be send as a message via Webworker
function makeWorkerInput(funcName: WwFunctionName, funcInput: any[]): WwData {
    return { funcName: funcName, funcInput: funcInput }
}

/**
Function to streamline the search of a variable x, that gives a certain result of a function
Using boundaries, making the search area smaller each step

leftEvaluation can be a number or function
rightEvaluation has to be a function

can be seen as:
return x so that:
    leftEvaluation(x) ~= rightEvaluation(x)

set bigLeft_upX to true, if: Bigger left side -> have to increase x to equalize 

*/
function boundarySearch(leftEvaluation: any, rightEvaluationFunc: EvalFunction, bigLeft_upX: boolean, boundaries: SearchBoundaries = {}, startValue?: number){
    
    // iteration max
    const MAX_ITERATION: number = 100;

    // accepted difference
    const EPSILON: number = 0.001;

    // if no startvalue is given, just set start to one. Not advised! Better calculate a good start
    let testValue = (isNaN(startValue)) ? 1 : startValue;
    let prevValue = -1;
    
    // left and right side of the equation we want to make true
    let leftSide: number;
    let rightSide: number;
    let leftSideBigger: boolean;
    let equationDifference: number;
    let absEquationDifference: number;

    let bestResult: BestSearchResult = {
        testValue: -1
        , absEquationDifference: -1
    };

    // if no boundaries for the value are given, use generic start
    boundaries = Object.assign({
        lowerBoundary: 0
        ,hasUpperBoundary: false
        ,upperBoundary: -1
    },boundaries);

    // if leftEvaluation is a number, disguise it as a function
    let leftEvaluationFunc: EvalFunction = (Object.prototype.toString.call(leftEvaluation) === '[object Number]') ? ()=>{return leftEvaluation} : leftEvaluation;

    /* start of search */
   
    for (let index = 0; index < MAX_ITERATION; index++) {
        
        // if the value does not change (rounding probably) we stop
        if (prevValue === testValue) {
            
            break;
        }
        prevValue = testValue;
        
        // evaluate left side of equation
        leftSide = leftEvaluationFunc(testValue);
        // evaluate right side of equation
        rightSide = rightEvaluationFunc(testValue);
        // calc difference
        equationDifference = leftSide - rightSide;
        absEquationDifference = Math.abs(equationDifference);
        
        leftSideBigger = (equationDifference > 0);
        

        // save the best result
        if (absEquationDifference < bestResult.absEquationDifference || bestResult.absEquationDifference < 0) {
            bestResult.absEquationDifference = absEquationDifference;
            bestResult.testValue = testValue;
        }
        
        
        // difference small enough
        if (absEquationDifference <= EPSILON) {
            // console.log(testValue);
            
            break;
        // we increase the value depending on the bigger side, and the effect of a value change
        } else if (leftSideBigger == bigLeft_upX) {
            // we increase the value
            
            // update lower boundary
            boundaries.lowerBoundary = testValue;
            if(boundaries.hasUpperBoundary){
                // arithm. middle between old and new boundary
                testValue = (boundaries.upperBoundary + boundaries.lowerBoundary) / 2;
            } else {
                // double if value still didn't reach target value
                testValue *= 2;
            }

        } else {
            // we decrease the value
            boundaries.hasUpperBoundary = true;
            boundaries.upperBoundary = testValue;
            // arithm. middle between old and new height (we always have a lower boundary at 0)
            testValue = (boundaries.lowerBoundary + boundaries.upperBoundary) / 2;
        }


    }
    return bestResult.testValue;
}


/**
    new search boundary for a boundary search
*/
function getNewSearchBoundary(): SearchBoundaries{
    return {
        lowerBoundary: 0
        ,hasUpperBoundary: false
        ,upperBoundary: -1
    }
}

/**
    getting the color of a circlke depending on the colormode
*/
function getCircleColor(inputConfig: InputConfig, circle: Circle): any {
    switch (inputConfig.color.colorMode) {
        case "normal":
            return circle.origColor;
        case "error":
            return colorDisError(inputConfig, circle);
        default:
            console.warn("The dot-colormode \"" + inputConfig.color.colorMode + "\" was not found!")
            return "#000000";
    }
}

/**
    returns a nice string to show time 
*/
function msToTime(duration: number) {
    let milliseconds = Math.floor(duration%1000)
        , seconds = Math.floor((duration/1000)%60)
        , minutes = Math.floor((duration/(1000*60))%60)
        , hours = Math.floor((duration/(1000*60*60))%24);
    
    return hours + "h " + minutes + "m " + seconds + "s " + milliseconds + "ms ";
}


// insertion Sort on the current position
function insertionSort(circleData: CircleData, size: number){
    // backwards index for insertion
    let j: number;
    let tempCircle: Circle;
    for(let i = 1; i < size; i++){
        j = i;
        while(j > 0 && circleData[j].xPix < circleData[j-1].xPix){
            // swap both circles in circleData
            tempCircle = circleData[j]
            circleData[j] = circleData[j-1];
            circleData[j-1] = tempCircle
            j--;
        }
    }
    return circleData;
}


/**insertion Sort, but for the original, rather than current position*/
function insertionSortOriginal(circleData: CircleData, size: number){
    // backwards index for insertion
    let j: number;
    let tempCircle: Circle;
    for(let i = 1; i < size; i++){
        j = i;
        // Maybe tempVar swap better
        while(j > 0 && circleData[j].origXdom < circleData[j-1].origXdom){
            // swap both circles in circleData
            tempCircle = circleData[j]
            circleData[j] = circleData[j-1];
            circleData[j-1] = tempCircle;
            j--;
        }
    }
    return circleData;
}


/** takes the inputconfig, Plotdim, and an xPix value and returns the densityDom */
function xPixToDensPix(inputConfig: InputConfig, plotParam: PlotParam, xPix: number){
    return plotParam.yAxisScale(0) - plotParam.yAxisScale( inputConfig.dots.dotscaling.scaleDensityDom( plotParam.kde(xPix) , inputConfig.dots.dSingle ) );
}


/** Since Inputdata is already sorted by x we just do a simple insertion */
function mergeInputData(inputConfig: InputConfig, inputData: InputData, newInputData: InputData): InputData {
    let newData: InputDataObj;
    let dataAdded: boolean;
    for (let newIndex = 0; newIndex < newInputData.length; newIndex++) {
        newData = newInputData[newIndex];
        dataAdded = false;
        for (let index = 0; index < inputData.length; index++) {
            // compare new data with current data
            if (newData[inputConfig.xAttribute] < inputData[index][inputConfig.xAttribute]) {
                // adds the new data to inputData
                inputData.splice(index, 0, newData);
                dataAdded = true;
                break;
            };
        }
        if (!dataAdded) {
            // add data at the end if bigger than all
            inputData.push(newData);
        }
    }
    return inputData;
}

function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}