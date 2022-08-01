// code doesn't know  kernel here, but it exists when used
declare let kernel: any;

// external GUI library
function relaxedPlotGUI(dotplotReturn: DotplotReturn){
    let inputConfig = dotplotReturn.inputConfig;
    let plot = dotplotReturn.func;

    async function redrawAndUpdateGUI(){
        dotplotReturn = await plot.redrawGraph();
        // currently GUI is completely redone
        gui.destroy();
        relaxedPlotGUI(dotplotReturn);
    }

    let gui = new dat.GUI();
    gui.add({redraw: redrawAndUpdateGUI}, "redraw").name("Redraw Graph");
    
    gui.add(inputConfig, "debugMeasurements");
    gui.add({getError: plot.printCircleError}, "getError").name("Get Circle Error");
    gui.add({testNoise: plot.exportLayoutToTxt}, "testNoise").name("Get Layout Txt");
    gui.add({showOverlap: plot.getOverlap}, "showOverlap").name("Show Overlap");
    gui.add({a: plot.saveInputconfig}, "a").name("Save InputConfig");
    
    
    let visibleFolder = gui.addFolder("Visibility");
    
    visibleFolder.add({hideOrshow: plot.toggleVoronoi}, "hideOrshow").name("Voronoi");
    visibleFolder.add({hideOrshow: plot.toggleDots}, "hideOrshow").name("Circles");
    visibleFolder.add({hideOrshow: plot.toggleLowOpaDots}, "hideOrshow").name("Circles Low");
    visibleFolder.add({hideOrshow: plot.toggleDens}, "hideOrshow").name("Density");
    visibleFolder.add({hideOrshow: plot.toggleAxis}, "hideOrshow").name("Axis Desc");
    visibleFolder.add({hideOrshow: plot.toggleAxisFull}, "hideOrshow").name("Axis Full");
    
    
    
    // Old InputConfig Param GUI
    let inputFolder = gui.addFolder("InputConfig");
    let plotSettingFolder = inputFolder.addFolder("Plot Settings");
    let dotSettingFolder = inputFolder.addFolder("Dot Settings");
    let imageSettingFolder = inputFolder.addFolder("Image Settings");
    // let blurSettingFolder = inputFolder.addFolder("Blur Settings");
    
    plotSettingFolder.add(inputConfig.dots.dotscaling, "name", { Linear: "linear", Root: "root", Logarithmic: "log" } );
    plotSettingFolder.add(inputConfig.dots.dotscaling, "oneDotMode", { Normal: "normal", Linear: "linear", Constant: "constant"} );
    plotSettingFolder.add(inputConfig.dots.dotscaling, "scaleInput").name("Scale Param");
    plotSettingFolder.add(inputConfig, "xTicks").step(1).onFinishChange(plot.updateXTicks);
    plotSettingFolder.add(inputConfig, "margin", 0, 50).step(1);
    plotSettingFolder.add(inputConfig.aspect, "ratio");
    plotSettingFolder.add(inputConfig, "randomSeed");
    
    
    
    // radiusMode enum iteration
    dotSettingFolder.add(inputConfig.color, "colorMode", { Normal: "normal", Error: "error"} ).onFinishChange(plot.updateDotColor);;
    dotSettingFolder.add(inputConfig.dots, "radiusMode", { Column: "column", KDE: "kde" } );
    dotSettingFolder.add(inputConfig.dots, "dSingle", 0.5).step(0.5);
    dotSettingFolder.add(inputConfig.color, "differenceTolerance", 0, 100).step(1).name("Swap Tolerance");
    dotSettingFolder.add(inputConfig.dots, "circlePadding", 0, 0.95).step(0.05).onFinishChange(plot.updateDotRads);
    dotSettingFolder.add(inputConfig.extraInfo, "dotCount").min(1).name("Dot amount");
    
    imageSettingFolder.add(inputConfig.images, "useImages");
    imageSettingFolder.add(inputConfig.images, "imageBorderPerc").onFinishChange(plot.redrawDensity);
    
    
    // Density GUI
    
    let densityFolder = gui.addFolder("densityConfig");
    
    
    let kernelHelper = {
        kernelName: inputConfig.density.kernel.name
    }
    

    
    densityFolder.add(inputConfig.density, "useBoundary").onFinishChange(plot.redrawDensity);
    densityFolder.add(inputConfig.density, "dSingleBandwidth");
    densityFolder.add(inputConfig.density, 'bandwidth',0.5).step(0.5).name("Bandwidth").onFinishChange(plot.redrawDensity);
    densityFolder.add(inputConfig.density, 'sampleRate',1,4000).step(1).name("sampleRate").onFinishChange(plot.redrawDensity);
    densityFolder.add(kernelHelper, 'kernelName', { Gaussian: "gaus", Uniform: "uni", Epanechnikov: "epa", CircleArea: "cir" } ).name("Kernel Type").onFinishChange(()=>{
        switch (kernelHelper.kernelName) {
            case "gaus":
                inputConfig.density.kernel = kernel.gaussian();
                break;
            case "uni":
                inputConfig.density.kernel = kernel.uniform();
                break;
            case "epa":
                inputConfig.density.kernel = kernel.epanechnikov();
                break;
            case "cir":
                inputConfig.density.kernel = kernel.circleArea();
                break;
            default:
                console.error("Kernel does not exist!");
                break;
        }
        plot.redrawDensity();
    });
    
    
    // densityFolder.add(inputConfig.density, 'percent',-1, 1).step(0.05).name("Percentage").onFinishChange(redrawDensity);
    
    
    
    // densityFolder.add({hideOrshow: hideOrShowDots}, "hideOrshow").name("Hide/Show Circs");
    // densityFolder.add({hideOrshow: hideOrShowDens}, "hideOrshow").name("Hide/Show Dens");
    
    // densityFolder.add({redraw: redrawGraph}, "redraw").name("Redraw Graph");
    
    // Relaxing Values
    
    let relaxingFolder = gui.addFolder("relaxingConfig");
    // at the top for easy access
    relaxingFolder.add(inputConfig.relaxing, "squichDots");
    relaxingFolder.add(inputConfig.relaxing, "useWebGL");
    
    let relaxingValuesFolder = relaxingFolder.addFolder("values");
    let relaxingModesFolder = relaxingFolder.addFolder("modes");
    
    relaxingValuesFolder.add(inputConfig.relaxing, "iter").step(1).min(1);
    relaxingValuesFolder.add(inputConfig.relaxing, "supSampFactor").step(0.1).min(0.1);
    relaxingValuesFolder.add(inputConfig.relaxing, "xCorrection").step(0.1).min(0);
    relaxingValuesFolder.add(inputConfig.relaxing, "errorScale").step(0.1).min(0.1);
    
    relaxingValuesFolder.add(inputConfig.relaxing, "xOffsetWeight").step(0.1).min(0);
    relaxingValuesFolder.add(inputConfig.relaxing, "yOffsetWeight").step(0.1).min(0);
    
    relaxingValuesFolder.add(inputConfig.relaxing, "overlapUsePadding");
    
    // Relaxing GUI
    
    // relaxingModesFolder.add(inputConfig.relaxing, "voronoiMode", { Cone: "cone", Flood: "flood"} );
    relaxingModesFolder.add(inputConfig.relaxing, "colorMode", { Normal: "normal", Error: "error" , Coverage: "coverage"} );
    relaxingModesFolder.add(inputConfig.relaxing, "xCorrectionType", {Force: "force",LinearArea: "linearArea", CircleArea: "circleArea"} );
    
    relaxingFolder.add({update: plot.nextRelaxingSteps}, "update").name("Next Relaxing Step");
    relaxingFolder.add({UpdateVoronoi: plot.updateVoronoi}, "UpdateVoronoi");
    relaxingFolder.add({url: plot.copyVoronoiURL}, "url").name("Voronoi URL");
    //relaxingFolder.add({saveSvg: savePlotSVG}, "saveSvg").name("Plot SVG");

}