/**
Receives inputData and inputConfig as input.
Throws error if input contains a mistake
Initializes the doubleSweep and calculates everything necessary for graph drawing with d3
*/
async function newRelaxedPlot(inputData: InputData, inputConfig: InputConfig) : Promise<DotplotReturn> {


    // is color active
    let hasColor: boolean;
    // result of the double Sweep and window size calculation
    let plotParam: PlotParam;
    // Circles in array
    let circleData : CircleData;
    // chart to draw the plot
    let chart: Chart;
    // dotplot functions
    let dotPlot: DotplotReturn;

    // start of the output to be put into the output file
    inputConfig.extraInfo = {
        dotCount: inputData.length
    };

    // fill in standard values for all configs
	inputConfig = Object.assign({
		containerId:"div"
		,xAttribute:"x"
        ,xTicks:10
        ,margin:10
        ,xLabel:inputConfig.xAttribute
        ,randomSeed:12345
        ,studyActive: false
        ,debugMeasurements: false
	}, inputConfig);

    // dot settings
    inputConfig.dots = Object.assign({
		dSingle:1
        ,radiusMode: "kde"
		,dotscaling:dotscaling.root(0.3)
		,circlePadding:0.1
	}, inputConfig.dots);



    // color values
    inputConfig.color = Object.assign({
		attribute:null
        ,scale:[{color:"black", position:1}]
        ,attributeMap:null
        ,differenceTolerance: 5
        ,colorMode: "normal"
    }, inputConfig.color)

    inputConfig.aspect = Object.assign({
        // width / height
        ratio:-1
        ,iter:50
    }, inputConfig.aspect)

    inputConfig.blur = Object.assign({
        edge:-1
        ,val:1
        ,ramp:3
        ,gapDistance:2
    }, inputConfig.blur)

    // density attributes
    inputConfig.density = Object.assign({
        
        dSingleBandwidth: true
        ,bandwidth: inputConfig.dots.dSingle
        // if 0 or smaller use pixel width
        ,sampleRate: -1
        ,kernel: kernel.gaussian()
        ,ballonballonEstimator: 1
        ,useBoundary: true
        // TEMP VAR TODO
        // ,percent: 0
    }, inputConfig.density)

    // Balloon estimator attributes
    inputConfig.density.balloonEstimator = Object.assign({
        active: false
        ,constant: 2
    }, inputConfig.density.balloonEstimator)


    // Relaxing config
    inputConfig.relaxing = Object.assign({
        iter:200
        ,stopThreshold: 0.003
        ,supSampFactor: 4
        ,colorMode: "normal"
        ,voronoiMode: "flood"
        ,useKDE: true
        ,errorScale: 64
        ,xCorrection: 0.3
        ,xCorrectionType: "force"
        // weights for x and y direction offset during relaxing
        ,xOffsetWeight: 1
        ,yOffsetWeight: 2
        // should the overlap use the padding
        ,overlapUsePadding: false
        ,useWebGL: true
        ,squichDots: true
    }, inputConfig.relaxing)


    // Images attributes
    inputConfig.images = Object.assign({
        attribute: inputConfig.color.attribute
        ,useImages:false
        ,imageBorderPerc: 0.8
    }, inputConfig.images)



    // xLabel setting
	if(inputConfig.xLabel === undefined) {
		inputConfig.xLabel = inputConfig.xAttribute;
    }

    /* Throw Errors */
    validateInput(inputConfig, inputData);

    // check if color is used
    hasColor = (inputConfig.color.attribute in inputData[0]);

	/* Flooring Integers*/
	inputConfig.xTicks = Math.floor(inputConfig.xTicks);
	inputConfig.blur.edge = Math.floor(inputConfig.blur.edge);
    inputConfig.blur.ramp = Math.floor(inputConfig.blur.ramp);
    inputConfig.aspect.iter = Math.floor(inputConfig.aspect.iter);

    // sort InputData according to the xAttribute (low to high)
    sortX(inputData, inputConfig.xAttribute);
    // doubleSweep and window size
    plotParam = createPlotDimension(inputConfig, inputData, hasColor
        ,document.getElementById(inputConfig.containerId).style.height
        ,document.getElementById(inputConfig.containerId).style.width);

    // create circle data
    circleData = createCircleData(inputConfig, inputData, hasColor, plotParam);


    // create graph for d3
    chart = plotter();
    chart.inputConfig(inputConfig)
        .inputData(inputData)
        .plotParam(plotParam)
        .hasColor(hasColor);

    
    // d3 draws graph with data
    d3.select("#" + inputConfig.containerId)
        .datum(circleData)
        .call(chart);

    
    // Returned object that represents the dotplot and all settings tied to it
    dotPlot =  chart.dotplotReturn();

    // starter functions
    await dotPlot.func.nextRelaxingSteps();

    return dotPlot;

};



