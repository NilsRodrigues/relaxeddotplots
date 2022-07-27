
/**
Draws the plot with added data and parameters
Returns an Object with all the functions of a plot
*/	
function plotter(): Chart {
	let densityPlot;
	let plotTime = Date.now() 

	// plot Var
	let voronoiGL: VoronoiGL;
	let inputConfig: InputConfig;
	let plotParam: PlotParam;
	let hasColor: boolean;
	// all in sweep included, but accessible for convenience
	let xDomain: Domain;
    let yDomain: Domain;
	let inputData: InputData;
	let width: number;
	let height: number;
	let xAxisHeight: number;
	// axis scales
	let xAxisScale: any;
	let yAxisScale: any;


	let dotShown = true;
	let densShown = false;
	let axisShown = true;
	let firstUpdate = true;

	/*
		Class to put in all GUI functions
	*/
	let guiFunctions: GUIFunctions;

	/* 
		Object that the user can use for plot functions
	*/
	let dotplotReturn: DotplotReturn;

	// helper for saving new dot rads
	let newRads: NewRads;

	function chart(selection: any) {

		selection.each(function(circleData : CircleData) {

			let pixelMap: PixelMap;
			
			let evalOutput: EvalOutput = {
				plotsettings: inputConfig
				,history: {
					stepRuntime:[]
					,SSE:[]
					,MSE:[]
					,SDM:[]
					,MDM:[]
					,SSM:[]
					,MSM:[]
					,SOD:[]
					,MOD:[]
					,SOP:[]
					,MOP:[]
				}
				,metrics: {
					SSE:0
				}
			};


			// define svg with data
			let svg = d3.select(this).selectAll("svg").data([circleData]);
			
			let transformHeight : number;
            let transformWidth: number;
			
			// height transformation for uniform placement
            if (isNaN(parseInt(document.getElementById(inputConfig.containerId).style.height))) {
                transformHeight = 0;
			} else {
                transformHeight = (parseInt(document.getElementById(inputConfig.containerId).style.height) - (height + inputConfig.margin + xAxisHeight)) / 2;
			}
				
			if (isNaN(parseInt(document.getElementById(inputConfig.containerId).style.width))){
                transformWidth = 0;
            } else {
                transformWidth = (parseInt(document.getElementById(inputConfig.containerId).style.width) - (width + (2 * inputConfig.margin))) / 2;
			}
			
			// svg container
            let svgTwo = svg.enter().append("svg")
				.attr("id", "plot-" + inputConfig.containerId)
                .attr("width", width + (2 * inputConfig.margin))
				.attr("height", height + inputConfig.margin + xAxisHeight)
				.attr("transform", "translate(" + transformWidth + "," + transformHeight + ")")

			
			// Graph
            let g = svgTwo.append("g").attr("transform", "translate(" + inputConfig.margin + "," + inputConfig.margin + ")");

			voronoiGL = new VoronoiGL(inputConfig, g);

			// Define div for tooltip
			let div = d3.select(this).append("div")	
				.attr("class", "tooltip")
				.style("position", "absolute")
				.style("text-align", "left")
				.style("width", "auto")
				.style("height", "auto")
				.style("padding", "3px")
				.style("font", "12px sans-serif")
				.style("background", "lightsteelblue")
				.style("border-radius", "5px")
				.style("pointer-events", "none")
				.style("opacity", 0);

				//Define filter for blur
				if (inputConfig.blur.edge >= 0) {
					let defs = svgTwo.append("defs");
						// .selectAll("filter")
						// .data((d: CircleData) => {return d;})
					circleData.forEach(circle => {
						defs.append("filter")
						.attr("id", "cicleBlur-" + circle.xPix + circle.yPix ) 
						.attr("height",((circle.radiusPix * inputConfig.blur.val) * 200) + "%")
						.attr("y",(((circle.radiusPix * inputConfig.blur.val) * -100) + 50) + "%")
						.append("feGaussianBlur")
						.attr("class", "blurValues")
						.attr("in", "SourceGraphic")
						.attr("stdDeviation","0 " + ((circle.radiusPix * inputConfig.blur.val) * circle.blur));
					})
				}


			// Translation of x/y-Values into Pixel
			let y = d3.scaleLinear()
			 	.range([height, 0])
			 	.domain(yDomain)
			
			let x = d3.scaleLinear()
			 	.range([0, width])
			 	.domain(xDomain)

			let xAxis = d3.axisBottom(x)
			    .ticks(inputConfig.xTicks)
				.tickPadding(7)
			    .tickSize(0);
			
            // x-Axis Label
			let xAxisLabelSVG = g.append("text")
				.attr("class", "graph label")
                .attr("transform", "translate(" + (width / 2) + "," + (height + xAxisHeight - 4) + ")")
                .style("font", "15px sans-serif")
                .style("text-anchor", "middle")
                .text(inputConfig.xLabel);

            // Add Axis to graph
            let xAxisSVG = g.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
				.style("font", "15px sans-serif")
				.call(xAxis);
			
			let xAxisDescSVG = xAxisSVG.selectAll("g");

			xAxisDescSVG.select("line")
                .attr("y2", 5)				
				//.attr("y1", -height);

			// creates a group for the circles
			let circleGroups = g.append("g")
			    .attr("class","circle-group")

			// Object with reference to every html-circle
			let circlesD3Ref: CirclesD3Ref = {};


			// gives every circle its attributes and Style
			circleData.forEach((circle: Circle) =>{
				drawDot(circle);
			});

			
			// creates density plot
			densityPlot = g.append("path")
				.attr("id", "densityPlot-" + inputConfig.containerId)
				.attr("fill", "none")
				.attr("opacity", "0")
				.attr("stroke", "#000")
				.attr("stroke-width", 1)
				.attr("stroke-linejoin", "round")
			// densityPlot = d3.select("#densityPlot-" + inputConfig.containerId)
			// draws density for the first time
			let densityReturn: DensityReturn = quickDrawDens();

			plotTime = Date.now() - plotTime; 
    		inputConfig.extraInfo.plotRuntime = plotTime;
			
			
			guiFunctions = {
				nextRelaxingSteps: nextRelaxingSteps,

				redrawGraph: redrawGraph,
				redrawDensity: redrawDensity,

				updateXTicks: updateXTicks,
				updateDotColor: updateDotColor,
				updateDotRads: updateDotRads,
				updateVoronoi: updateVoronoi,

				printCircleError: printCircleError,
				exportLayoutToTxt: exportLayoutToTxt,
				saveInputconfig: saveInputconfig,
				copyVoronoiURL: copyVoronoiURL,
				savePlotSVG: savePlotSVG,

				getOverlap: getOverlap,
				toggleVoronoi: toggleVoronoi,
				toggleDots: toggleDots,
				toggleLowOpaDots: toggleLowOpaDots,
				toggleDens: toggleDens,
				toggleAxis: toggleAxis,
				toggleAxisFull: toggleAxisFull,
			};
			
			dotplotReturn = {
				func: guiFunctions,
				inputConfig: inputConfig,
				plotParam: plotParam,
				relaxCallback: null,
			}

			/**
			 * 
			 * Function Dump
			 * 
			 */

			/** Deletes and redraws the whole graph, then returns settings for the new one */
			function redrawGraph() {
				if (firstUpdate) {
					firstUpdate = false;

					try {
						// create new dotscaling based on the input of the GUI
						inputConfig.dots.dotscaling = dotscaling[inputConfig.dots.dotscaling.name](inputConfig.dots.dotscaling.scaleInput, inputConfig.dots.dotscaling.oneDotMode);
						svg.enter().selectAll("*").remove();
						return newRelaxedPlot(inputData,inputConfig);
					} catch (error) {
						console.warn(error);
						firstUpdate = true;
					}
				}
			}
			
			/** saves png of the plot */
			function savePlotSVG(){
				saveSvg(document.getElementById("plot-" + inputConfig.containerId), "dotplot.svg");
			}
	
			/** save a txt with infos for making a blue noise image */
			function exportLayoutToTxt(){
				_exportLayoutToTxt(inputConfig, circleData, plotParam);;
			}
			
			/** return the added overlap of all circles */
			function getOverlap(): OverlapStatus{
				circleData.forEach(circle => {
					circle.xPix *= inputConfig.relaxing.supSampFactor;
					circle.yPix *= inputConfig.relaxing.supSampFactor;
					circle.origXpix *= inputConfig.relaxing.supSampFactor;
					circle.radiusPix *= inputConfig.relaxing.supSampFactor;
				})
				let output = voronoiGL.showOverlap(inputConfig, circleData, plotParam);
				circleData.forEach(circle => {
					circle.xPix /= inputConfig.relaxing.supSampFactor;
					circle.yPix /= inputConfig.relaxing.supSampFactor;
					circle.origXpix /= inputConfig.relaxing.supSampFactor;
					circle.radiusPix /= inputConfig.relaxing.supSampFactor;
				})
				console.log(output);
				
				return output;
			}
			
			/** save a json of the inputconfig (does not include functions) and evaluation */
			function saveInputconfig(){
				download("evalOutput.json", JSON.stringify(evalOutput, null, 2));
			}
		
			/** update the xTicks on the x-Axis */
			function updateXTicks(){
				xAxis = d3.axisBottom(x)
				.ticks(inputConfig.xTicks)
				.tickPadding(7)
				.tickSize(5);
		
				xAxisSVG.call(xAxis);
			}
		
			/** show/hide Density curve */
			function toggleDens() {
				if(densShown){
					densityPlot.style("opacity", "0");
				} else {
					densityPlot.style("opacity", "1");
				}
				densShown = !densShown;
			}
			/** show/hide Dots */
			function toggleDots() {
				if(dotShown){
					for (const index in circlesD3Ref) {
						// if images are used deactivate them and even the second dot
						if (circlesD3Ref[index].image != null) circlesD3Ref[index].image.style("opacity", "0");
						if (circlesD3Ref[index].colorCircle != null) circlesD3Ref[index].colorCircle.style("opacity", "0");
					}
				} else {
					for (const index in circlesD3Ref) {
						if (circlesD3Ref[index].image != null) circlesD3Ref[index].image.style("opacity", "1");
						if (circlesD3Ref[index].colorCircle != null) circlesD3Ref[index].colorCircle.style("opacity", "1");
					}
				}
				dotShown = !dotShown;
			}
			/** show/hide Density curve*/
			function toggleLowOpaDots() {
				if(dotShown){
					for (const index in circlesD3Ref) {
						// if images are used deactivate them and even the second dot
						if (circlesD3Ref[index].image != null) circlesD3Ref[index].image.style("opacity", "0.5");
						if (circlesD3Ref[index].colorCircle != null) circlesD3Ref[index].colorCircle.style("opacity", "0.5");
					}
				} else {
					for (const index in circlesD3Ref) {
						if (circlesD3Ref[index].image != null) circlesD3Ref[index].image.style("opacity", "1");
						if (circlesD3Ref[index].colorCircle != null) circlesD3Ref[index].colorCircle.style("opacity", "1");
					}
				}
				dotShown = !dotShown;
			}
		
			/** show/hide some x-axis visuals */
			function toggleAxis() {
				if(axisShown){
					xAxisDescSVG.style("opacity", "0")
					xAxisLabelSVG.style("opacity", "0");
				} else {
					xAxisDescSVG.style("opacity", "1")
					xAxisLabelSVG.style("opacity", "1");
				}
				axisShown = !axisShown;
			}
			/** show/hide full x-Axis */
			function toggleAxisFull() {
				if(axisShown){
					xAxisDescSVG.style("opacity", "0")
					xAxisLabelSVG.style("opacity", "0");
					xAxisSVG.style("opacity", "0");
				} else {
					xAxisDescSVG.style("opacity", "1")
					xAxisLabelSVG.style("opacity", "1");
					xAxisSVG.style("opacity", "1");
				}
				axisShown = !axisShown;
			}
		
			/** recalculate and redraw density curve and update dots */
			function redrawDensity() {
				densityReturn = quickDrawDens();
				updateDotRads();
			}
			/** adds a new dot to the plot */
			function drawDot(circle: Circle) {
				circlesD3Ref[circle.d3RefID] = {};
				// colored circle is drawn if we either just use no image, or if the image has a border
				if (!inputConfig.images.useImages || hasColor) {
					circlesD3Ref[circle.d3RefID].colorCircle = circleGroups.append("circle")
						.attr("class", "circles")
						.attr("transform","translate(" + (circle.xPix) + "," + (yAxisScale(0) - circle.yPix) + ")")
						.attr("id", circle.d3RefID)
						.attr("r", getPadRadFunct(inputConfig)(circle.radiusPix))
						.style("filter", (() => {
							if (circle.blur > 0 && inputConfig.blur.edge >= 0) {
								return "url(#" + "cicleBlur-" + circle.xPix + circle.yPix + ")";
							}
							return null;
							})())
						.style("fill", getCircleColor(inputConfig, circle))
						.style("stroke", "black")
						.style("opacity", "1")
						.on("mouseenter", () => {	
							const tooltip = document.querySelector('.tooltip')
							div.html(circle.desc)
							//div.html(circle.desc + "<br/>next id: " + circle.nextID.id + "<br/>id: " + circle.id)
							if (d3.event.pageX > (width / 2)) {
								div.style("left", (d3.event.pageX - parseInt(getComputedStyle(tooltip).width) - 7) + "px");
							} else {
								div.style("left", (d3.event.pageX + 7) + "px");
							}
							if (d3.event.pageY > (height / 2)) {
								div.style("top", (d3.event.pageY - parseInt(getComputedStyle(tooltip).height) - 3) + "px");
							} else {
								div.style("top", (d3.event.pageY - 3) + "px")
							}
							
							div.style("opacity", 1);
						})
						.on("mouseleave", () => {div.style("opacity", 0);})
		
				}
		
				if (inputConfig.images.useImages) {
					// create new image object
					circlesD3Ref[circle.d3RefID].image = circleGroups.append("image")
						.attr("xlink:href", circle.URL)
						.on("mouseenter", () => {	
							const tooltip = document.querySelector('.tooltip')
							div.html(circle.desc)
							//div.html(circle.desc + "<br/>next id: " + circle.nextID.id + "<br/>id: " + circle.id)
							if (d3.event.pageX > (width / 2)) {
								div.style("left", (d3.event.pageX - parseInt(getComputedStyle(tooltip).width) - 7) + "px");
							} else {
								div.style("left", (d3.event.pageX + 7) + "px");
							}
							if (d3.event.pageY > (height / 2)) {
								div.style("top", (d3.event.pageY - parseInt(getComputedStyle(tooltip).height) - 3) + "px");
							} else {
								div.style("top", (d3.event.pageY - 3) + "px")
							}
							
							div.style("opacity", 1);
						})
						.on("mouseleave", () => {div.style("opacity", 0);})

					// check if image needs to be smaller
					if ( hasColor) {
						circlesD3Ref[circle.d3RefID].image
							.attr("transform","translate(" + (circle.xPix - getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc)) + "," + (yAxisScale(0) - circle.yPix - getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc)) + ")")
							.attr("width", getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2 )
							.attr("height", getPadRadFunct(inputConfig)(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2 )
					} else {
						circlesD3Ref[circle.d3RefID].image
							.attr("transform","translate(" + (circle.xPix - getPadRadFunct(inputConfig)(circle.radiusPix)) + "," + (yAxisScale(0) - circle.yPix - getPadRadFunct(inputConfig)(circle.radiusPix)) + ")")
							.attr("width", getPadRadFunct(inputConfig)(circle.radiusPix)*2)
							.attr("height", getPadRadFunct(inputConfig)(circle.radiusPix)*2)
					}
				}
				
			}
		
			/** recalculate and redraw density curve */
			function quickDrawDens(): DensityReturn{
				return calculateDrawDensity(
					inputConfig
					,inputData
					,circleData
					,getXdomSample(inputConfig.density.sampleRate, plotParam)
					,densityPlot
					,plotParam);
			}

			/** update the dot radius depending on the current density */
			function updateDotRads(): NewRads{
				if (inputConfig.dots.radiusMode != "kde") {
					return;
				}
				let padRadFunct = getPadRadFunct(inputConfig);
				//circlesD3Ref
				let newRads: NewRads = {};
				let circleID: number;
				let circle: Circle;
				circleData.forEach((circle, index) => {
					circleID = circle.d3RefID;
					// calc new Radius
					circle.radiusPix = inputConfig.dots.dotscaling.scaleDensDiamDom(plotParam.kde(circle.origXdom), inputConfig.dots.dSingle) * plotParam.domainToPixel / 2;
					// change optical circle
					if (circlesD3Ref[circleID].colorCircle != null) circlesD3Ref[circleID].colorCircle.attr("r", padRadFunct(circle.radiusPix));
					if (inputConfig.images.useImages) {
						if (hasColor) {
							// with colored border
							circlesD3Ref[circleID].image.attr("transform","translate(" + (circle.xPix - padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc)) + "," + (yAxisScale(0) - circle.yPix - padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc)) + ")")
								.attr("width", padRadFunct(circle.radiusPix * inputConfig.images.imageBorderPerc) * 2 )
								.attr("height", padRadFunct(circle.radiusPix* inputConfig.images.imageBorderPerc) * 2 )
						} else {
							// no colored border
							circlesD3Ref[circleID].image.attr("transform","translate(" + (circle.xPix - padRadFunct(circle.radiusPix)) + "," + (yAxisScale(0) - circle.yPix - padRadFunct(circle.radiusPix)) + ")")
								.attr("width", padRadFunct(circle.radiusPix)*2)
								.attr("height", padRadFunct(circle.radiusPix)*2);
						}
					}
					// put on result object
					newRads[index] = circle.radiusPix;
				})
		
			}
			
			/** update optical dot positions */
			function updateDotPosition(){
				let description: string;
				let padRad = getPadRadFunct(inputConfig);
				let circleID: number;
				circleData.forEach(circle => {
					circleID = circle.d3RefID;
					// images have slightly different positions
					if (circlesD3Ref[circleID].colorCircle != null) {
						circlesD3Ref[circleID].colorCircle.attr("transform","translate(" + circle.xPix + "," + (yAxisScale(0) - circle.yPix) + ")") 
							.style("fill", getCircleColor(inputConfig, circle))
					}
		
					if (inputConfig.images.useImages) {
						if (hasColor) {
							circlesD3Ref[circleID].image.attr("transform","translate(" + (circle.xPix - padRad(circle.radiusPix * inputConfig.images.imageBorderPerc)) + "," + (yAxisScale(0) - circle.yPix - padRad(circle.radiusPix * inputConfig.images.imageBorderPerc)) + ")")
						} else {
							circlesD3Ref[circleID].image.attr("transform","translate(" + (circle.xPix - padRad(circle.radiusPix)) + "," + (yAxisScale(0) - circle.yPix - padRad(circle.radiusPix)) + ")")
						}
					}
				})
			}
			
			/** update dot color */
			function updateDotColor(){
				let circleID: number;
				let circle: Circle;
				circleData.forEach(circle => {
					circleID = circle.d3RefID
					if (circlesD3Ref[circleID].colorCircle != null) {
						circlesD3Ref[circleID].colorCircle.style("fill", getCircleColor(inputConfig, circle))
					}
				})
			}
			
			/**
				execute the relaxation process
				Dots are distributed below the density curve
			*/
			async function nextRelaxingSteps(){
				let relaxStatus: RelaxStatus;
				let circleOne: Circle;
				let circleTwo: Circle;
				let relaxStep = 0;
		
				let stopError: number;
				
				// console.log("E" + EPSILON);
		
				evalOutput.metrics.totalRuntime = Date.now(); 
				
				let stepRuntime: number;
				
				let overlapStatus: OverlapStatus;
				let overlapDistance: number;
				let sumOverlapDiameter: number;
		
				// preparing circleData for relaxing, and afterwards changing back again
				circleData.forEach(circle => {
					circle.xPix *= inputConfig.relaxing.supSampFactor;
					circle.yPix *= inputConfig.relaxing.supSampFactor;
					circle.origXpix *= inputConfig.relaxing.supSampFactor;
					circle.radiusPix *= inputConfig.relaxing.supSampFactor;
				})
		
				// set last overlap to infinity, just to have a value
				// lastOverlap = Infinity;
				for (; relaxStep < inputConfig.relaxing.iter; relaxStep++) {
		
					stepRuntime = Date.now(); 
		
					relaxStatus = await relaxationStep(inputConfig, circleData, plotParam, voronoiGL, hasColor);
					
					// total runtime
					evalOutput.history.stepRuntime.push(Date.now() - stepRuntime);
					
					if(inputConfig.debugMeasurements){
						overlapStatus = voronoiGL.showOverlap(inputConfig, circleData, plotParam);
		
						// overlap error
						sumOverlapDiameter = 0;
						let smallestDistance;
						for (let indxOne = 0; indxOne < circleData.length ; indxOne++) {
							circleOne = circleData[indxOne];
							smallestDistance = Infinity;
							for (let indxTwo = 0; indxTwo < circleData.length ; indxTwo++) {
								circleTwo = circleData[indxTwo];
								if (indxOne === indxTwo) continue;
								// distance from middle of dot 1 to outside of dot 2
								overlapDistance = Math.max(euclidDist(circleOne, circleTwo) - getPadRadFunct(inputConfig)(circleTwo.radiusPix), 0);
								// onlz take smallest distance, because if dot doesn|t overlap that, he won't overlap any
								smallestDistance = (overlapDistance < smallestDistance) ? overlapDistance : smallestDistance;
								// if circle is completely enveloped no need to look for others
								if (smallestDistance <= 0) break;
								
							}
							// if dot 2 completely envelops dot one, error is max
							if (smallestDistance <= 0) {
								sumOverlapDiameter += 1;
							// no overlaping of dots
							} else if(smallestDistance >= getPadRadFunct(inputConfig)(circleOne.radiusPix)) {
								sumOverlapDiameter += 0;
							} else {
								sumOverlapDiameter += 1 - (smallestDistance / getPadRadFunct(inputConfig)(circleOne.radiusPix));
							}
						}
		
						// half the result
						sumOverlapDiameter /= 2;
		
						// placing error
						evalOutput.history.SSE.push(relaxStatus.sumSquaredError);
						evalOutput.history.MSE.push(relaxStatus.sumSquaredError / inputConfig.extraInfo.dotCount);
						// movement
						evalOutput.history.SDM.push(relaxStatus.sumDotMove);
						evalOutput.history.MDM.push(relaxStatus.sumDotMove / inputConfig.extraInfo.dotCount);
						// movement squared
						evalOutput.history.SSM.push(relaxStatus.squaredSumDotMove);
						evalOutput.history.MSM.push(relaxStatus.squaredSumDotMove / inputConfig.extraInfo.dotCount);
						// overlap diameter percentages
						evalOutput.history.SOD.push(sumOverlapDiameter);
						evalOutput.history.MOD.push(sumOverlapDiameter / inputConfig.extraInfo.dotCount);
						// overlap pixel
						evalOutput.history.SOP.push(overlapStatus.SOP);
						evalOutput.history.MOP.push(overlapStatus.MOP);
					}
		
					// end
					// Stop condition: Error change small enough
		
					// now MDM
					stopError = relaxStatus.sumDotMove / inputConfig.extraInfo.dotCount;
					if (relaxStep != 0 && stopError  <= inputConfig.relaxing.stopThreshold) {
						// console.log("relaxation early stop at step: " + (relaxStep + 1));
						break;
					}
		
		
					// increase epsilon by fixed rate
					//epsilon += 0.02
				}
				circleData.forEach(circle => {
					circle.xPix /= inputConfig.relaxing.supSampFactor;
					circle.yPix /= inputConfig.relaxing.supSampFactor;
					circle.origXpix /= inputConfig.relaxing.supSampFactor;
					circle.radiusPix /= inputConfig.relaxing.supSampFactor;
				})
		
				// total runtime
				evalOutput.metrics.relaxRuntime = d3.sum(evalOutput.history.stepRuntime);
				evalOutput.metrics.totalRuntime = Date.now() - evalOutput.metrics.totalRuntime;
		
				if(inputConfig.debugMeasurements){
					// placing error
					evalOutput.metrics.SSE = relaxStatus.sumSquaredError;
					evalOutput.metrics.MSE = relaxStatus.sumSquaredError / inputConfig.extraInfo.dotCount;
					// movement
					evalOutput.metrics.SDM = relaxStatus.sumDotMove;
					evalOutput.metrics.MDM = relaxStatus.sumDotMove / inputConfig.extraInfo.dotCount;
					// movement squared
					evalOutput.metrics.SSM = relaxStatus.squaredSumDotMove;
					evalOutput.metrics.MSM = relaxStatus.squaredSumDotMove / inputConfig.extraInfo.dotCount;
					// overlap diameter percentages
					evalOutput.metrics.SOD = sumOverlapDiameter;
					evalOutput.metrics.MOD = sumOverlapDiameter / inputConfig.extraInfo.dotCount;
					// overlap pixel
					evalOutput.metrics.SOP = overlapStatus.SOP;
					evalOutput.metrics.MOP = overlapStatus.MOP;
				}else{
					evalOutput.metrics.SSE = null;
					evalOutput.metrics.MSE = null;
					// movement
					evalOutput.metrics.SDM = null;
					evalOutput.metrics.MDM = null;
					// movement squared
					evalOutput.metrics.SSM = null;
					evalOutput.metrics.MSM = null;
					// overlap diameter percentages
					evalOutput.metrics.SOD = null;
					evalOutput.metrics.MOD = null;
					// overlap pixel
					evalOutput.metrics.SOP = null;
					evalOutput.metrics.MOP = null;
				}
		
				updateDotPosition();
				console.log("Relaxing Done");
				if (dotplotReturn.relaxCallback !== null) {
					dotplotReturn.relaxCallback();
				}
			}


			function updateVoronoi(){
		
				circleData.forEach(circle => {
					circle.xPix *= inputConfig.relaxing.supSampFactor;
					circle.yPix *= inputConfig.relaxing.supSampFactor;
					circle.radiusPix *= inputConfig.relaxing.supSampFactor;
				})
		
				voronoiGL.updateVoronoiImage(inputConfig, circleData, plotParam);
		
				circleData.forEach(circle => {
					circle.xPix /= inputConfig.relaxing.supSampFactor;
					circle.yPix /= inputConfig.relaxing.supSampFactor;
					circle.radiusPix /= inputConfig.relaxing.supSampFactor;
				})
			}
			
			/** show/hide voronoi image */
			function toggleVoronoi(){
				if(voronoiGL.toggleVisibility()){
					updateVoronoi();
				}
			}
			/** copy voronoi as a data URL */
			function copyVoronoiURL() {
				console.log("Copied Voronoi URL to clipboard!");
				//window.open(voronoiGL.getDataURL());
				navigator.clipboard.writeText(voronoiGL.getDataURL());
			  }
			
			/** log circle error on the console */
			function printCircleError(){
				let errorSum: number = 0;
				circleData.forEach(circle => {
					errorSum += Math.pow(((circle.origXpix - circle.xPix) / circle.radiusPix), 2);
				})
				console.log("Summed Squared Error: " + (errorSum));
				console.log("Mean Squared Error: " + (errorSum / circleData.length));
			}

			
		})
	}
	


	// Setter
	chart.inputConfig = (input: InputConfig) => {
		inputConfig = input;
		return chart;
	}

	chart.inputData = (input: InputData) => {
		inputData = input;
		return chart;
	}

	chart.plotParam = (input: PlotParam) => {
		plotParam = input;

		xDomain = plotParam.xDomain;
		yDomain = plotParam.yDomain;
		xAxisScale = plotParam.xAxisScale;
		yAxisScale = plotParam.yAxisScale;
        width = plotParam.width;
        height = plotParam.height;
        xAxisHeight = plotParam.xAxisHeight;
		return chart;
	}

	chart.hasColor = (input: boolean) => {
		hasColor = input;
		return chart;
	}


	chart.dotplotReturn = () : DotplotReturn => {
		return dotplotReturn;
	}

	return chart;
}