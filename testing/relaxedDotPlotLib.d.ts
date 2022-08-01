declare let tesoi: string;
/**
gives out the object saved in InputConfig without any functions
*/
declare class dotscaling {
    static linear(): DotscaleReturn;
    /** root function */
    static root(r: number, oneDotMode?: OneDotMode): DotscaleReturn;
    /** log function with boundary search to get result height */
    static log(b: number, oneDotMode?: OneDotMode): DotscaleReturn;
    /**
        Change the effect when dens < 1/dSingle
    */
    private static changeOneDotMode;
}
/**
Provides premade Kernel for density computing
*/
declare class kernel {
    /** Gaussian Kernel Bandwidth INSIDE Kernel */
    static gaussian(): KernelReturn;
    /** Uniform Kernel Bandwidth INSIDE Kernel */
    static uniform(): KernelReturn;
    /** Epanechnikov (parabolic) Kernel (changed to incoorporate bandwidth) */
    static epanechnikov(): KernelReturn;
    /** Kernel based of the area of a circle with the bandwisth as radius */
    static circleArea(): KernelReturn;
}
/**  error function, License: public domain */
declare function erf(x: any): number;
/**
Download @param text as a file with the name @param filename
*/
declare function download(filename: any, text: any): void;
/** returns the euclidean deistance between two circles*/
declare function euclidDist(c1: Circle, c2: Circle): number;
/** creates a .txt file that can be read by the original Jacobian-creation programm */
declare function _exportLayoutToTxt(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam): void;
declare let d3: any;
declare let dat: any;
declare let saveAs: Function;
declare let Delaunay: any;
declare let saveSvgAsPng: Function;
declare type GUI = any;
declare type InputData = InputDataObj[];
interface DotplotReturn {
    inputConfig: InputConfig;
    plotParam: PlotParam;
    func: GUIFunctions;
}
interface InputDataObj {
    [key: string]: any;
}
interface InputConfig {
    containerId?: string;
    xAttribute?: keyof InputDataObj;
    dots?: DotsConfig;
    color?: ColorConfig;
    xTicks?: number;
    blur?: BlurConfig;
    margin?: number;
    aspect?: AspectConfig;
    xLabel?: any;
    randomSeed?: number;
    density?: DensityConfig;
    relaxing?: RelaxingConfig;
    images?: ImagesConfig;
    extraInfo?: ExtraInfo;
    debugMeasurements?: boolean;
}
declare enum StudyModeEnum {
    pick = 0,
    compare = 1,
    density = 2
}
interface ExtraInfo {
    dotCount?: number;
    sweepRuntime?: number;
    plotRuntime?: number;
}
interface EvalOutput {
    plotsettings?: InputConfig;
    metrics?: Metrics;
    history?: MetricsHistory;
}
interface Metrics {
    relaxRuntime?: number;
    totalRuntime?: number;
    SSE?: number;
    MSE?: number;
    SDM?: number;
    MDM?: number;
    SSM?: number;
    MSM?: number;
    SOD?: number;
    MOD?: number;
    SOP?: number;
    MOP?: number;
}
interface MetricsHistory {
    stepRuntime?: number[];
    SSE?: number[];
    MSE?: number[];
    SDM?: number[];
    MDM?: number[];
    SSM?: number[];
    MSM?: number[];
    SOD?: number[];
    MOD?: number[];
    SOP?: number[];
    MOP?: number[];
}
interface OverlapStatus {
    SOP?: number;
    MOP?: number;
}
interface DotsConfig {
    dSingle?: number;
    radiusMode: keyof typeof RadiusModeEnum;
    dotscaling?: DotscaleReturn;
    circlePadding?: number;
    border?: boolean;
}
declare enum DotsColorModeEnum {
    normal = 0,
    error = 1
}
declare enum OneDotModeEnum {
    normal = 0,
    linear = 1,
    constant = 2
}
declare type OneDotMode = keyof typeof OneDotModeEnum;
declare enum RadiusModeEnum {
    column = 0,
    kde = 1
}
interface ColorConfig {
    attribute?: keyof InputDataObj;
    scale?: ColorScale[];
    attributeMap?: AttributeMap | null;
    differenceTolerance?: number;
    colorMode?: keyof typeof DotsColorModeEnum;
}
interface AspectConfig {
    ratio?: number;
    iter?: number;
}
interface BlurConfig {
    edge?: number;
    val?: number;
    ramp?: number;
    gapDistance?: number;
}
interface DensityConfig {
    bandwidth?: number;
    dSingleBandwidth?: boolean;
    kernel?: KernelReturn;
    balloonEstimator?: BallonEstimatorConfig;
    sampleRate?: number;
    useBoundary?: boolean;
}
interface BallonEstimatorConfig {
    active?: boolean;
    constant?: number;
}
interface Circle {
    d3RefID: number;
    URL: string;
    origXpix: number;
    origXdom: number;
    xPix: number;
    yPix: number;
    radiusPix: number;
    origColor: any;
    errorColor: any;
    coverageColor: any;
    desc: string;
    blur: number;
}
declare type CircleData = Circle[];
interface CirclesD3Ref {
    [key: number]: D3Ref;
}
interface D3Ref {
    colorCircle?: any;
    image?: any;
}
interface RectsD3Ref {
    [key: number]: any;
}
interface Column {
    xPos: number;
    c: number;
    colDiameterDom: number;
    startIndex: number;
}
interface PlotInfosKDE {
    xDomain: Domain;
    xAxisScale: any;
}
interface PlotParam {
    height: number;
    width: number;
    xDomain: Domain;
    xDomainWidth: number;
    yDomain: Domain;
    xAxisScale: any;
    yAxisScale: any;
    columns: Column[];
    colorNames: any[];
    colors?: ColorsObject;
    domainToPixel: number;
    xAxisHeight: number;
    supSampHeight?: number;
    supSampWidth?: number;
    boundaryList: BoundaryList;
    kde: KDE;
    updateTextures: boolean;
}
interface DoubleSweepResult {
    columns: Column[];
    highestColumn: number;
    highestPlotPointDom: number;
    colorNames: any[];
}
interface UpscaledSweepInput {
    upscaleFactor: number;
    dSingleSweep: number;
    inputDataSweep: InputData;
}
interface BestRatioResult {
    dSingle: number;
    aspectRatioDifference: number;
}
interface BestHeightResult {
    height: number;
    densityAbsDifference: number;
}
interface BestDiameterResult {
    diameter: number;
    equationDifference: number;
}
interface BestSearchResult {
    testValue: number;
    absEquationDifference: number;
}
interface SearchBoundaries {
    lowerBoundary?: number;
    hasUpperBoundary?: boolean;
    upperBoundary?: number;
}
declare type CToDiamDatabase = {
    [key: string]: number;
};
declare type EvalFunction = (testValue?: number) => number;
declare type AddData = (newData: InputData) => void;
declare type RemoveData = (id: number) => void;
declare enum DotscaleNameEnum {
    linear = 0,
    root = 1,
    log = 2
}
declare type DotscaleFunction = (c?: number, dSingle?: number) => number;
declare type DotscaleName = keyof typeof DotscaleNameEnum;
declare type ScaleDensityDom = (density: number, dSingle: number) => number;
declare type ScaleDensDiamDom = (density: number, dSingle: number) => number;
interface DotscaleReturn {
    name: DotscaleName;
    oneDotMode: OneDotMode;
    scaleInput: number;
    columnToDiamDom: DotscaleFunction;
    scaleDensityDom: ScaleDensityDom;
    scaleDensDiamDom: ScaleDensDiamDom;
}
interface LogTable {
    height: number;
    density: number;
}
declare enum KernelNameEnum {
    gaus = 0,
    uni = 1,
    epa = 2,
    cir = 3
}
declare type Kernel = (u: number, bandwidth: number) => number;
declare type KernelName = keyof typeof KernelNameEnum;
declare type KernelSquaredIntegral = (bandwidth: number) => number;
interface KernelReturn {
    name: KernelName;
    kernelFunction: Kernel;
    kernelSquaredIntegral: KernelSquaredIntegral;
}
declare type KDE = (xPos: number) => number;
declare type DensityReturn = DensPoint[];
declare type KDEinput = KDEinputEntry[];
interface KDEinputEntry {
    xDom: number;
    radiusPix: number;
}
interface DensPoint {
    xDom: number;
    densityDom: number;
}
declare type Domain = [number, number];
declare type AttributeMap = (value: any) => number;
interface LinearScaleFkt extends Function {
    domain: any;
}
interface ColorScale {
    color: string;
    position?: number;
}
declare type ColorName = string | number;
declare type ColorsObject = {
    [key in ColorName]: any;
};
interface HSLcolor {
    h: number;
    s: number;
    l: number;
    opacity: number;
}
interface WwData {
    funcName: string;
    funcInput: any[];
}
declare enum WwFunctionNameEnum {
}
declare type WwFunctionName = keyof typeof WwFunctionNameEnum;
interface NewRads {
    [key: number]: number;
}
interface Chart {
    (selection: any): void;
    inputConfig(input: InputConfig): Chart;
    inputData(input: InputData): Chart;
    plotParam(input: PlotParam): Chart;
    hasColor(input: boolean): Chart;
    dotplotReturn(): DotplotReturn;
}
interface GUIFunctions {
    nextRelaxingSteps: Function;
    redrawGraph: () => Promise<DotplotReturn>;
    redrawDensity: Function;
    updateXTicks: Function;
    updateDotColor: Function;
    updateDotRads: Function;
    updateVoronoi: Function;
    printCircleError: Function;
    exportLayoutToTxt: Function;
    saveInputconfig: Function;
    copyVoronoiURL: Function;
    savePlotSVG: Function;
    getOverlap: Function;
    toggleVoronoi: Function;
    toggleDots: Function;
    toggleLowOpaDots: Function;
    toggleDens: Function;
    toggleAxis: Function;
    toggleAxisFull: Function;
}
declare type RNG = () => number;
declare enum VoronoiColorModeEnum {
    normal = 0,
    error = 1,
    coverage = 2
}
declare enum RelaxVoronoiModeEnum {
    cone = 0,
    flood = 1
}
declare enum RelaxXCorrectionTypeEnum {
    force = 0,
    linearArea = 1,
    circleArea = 2
}
interface CirclePixel {
    [key: number]: number;
}
interface Moments {
    [key: number]: MomentsEntry;
}
interface MomentsEntry {
    moment00?: number;
    moment10?: number;
    moment01?: number;
}
interface RelaxingConfig {
    iter?: number;
    supSampFactor?: number;
    colorMode?: keyof typeof VoronoiColorModeEnum;
    voronoiMode?: keyof typeof RelaxVoronoiModeEnum;
    errorScale?: number;
    xCorrection?: number;
    xCorrectionType?: keyof typeof RelaxXCorrectionTypeEnum;
    xOffsetWeight?: number;
    yOffsetWeight?: number;
    stopThreshold?: number;
    overlapUsePadding?: boolean;
    useWebGL?: boolean;
    squichDots?: boolean;
}
interface RelaxStatus {
    sumDotMove?: number;
    squaredSumDotMove?: number;
    sumSquaredError?: number;
}
interface PixelMapEntry {
    dotKey?: number;
}
declare type PixelMap = PixelMapEntry[];
interface ColorRGB {
    r: number;
    g: number;
    b: number;
}
interface ImagesConfig {
    useImages?: boolean;
    attribute?: keyof InputDataObj;
    imageBorderPerc?: number;
}
interface ImageList {
    [key: string]: {
        fileName: string;
        order: number;
    };
}
declare type BoundaryList = BoundaryEntry[];
interface BoundaryEntry {
    xDom: number;
    isRight: boolean;
}
interface BinCollection {
    [key: number]: InputData;
}
interface DistList {
    [key: number]: OneDotDist;
}
interface OneDotDist {
    [key: number]: number;
}
interface Coords {
    x?: number;
    y?: number;
}
/**
Draws the plot with added data and parameters
Returns an Object with all the functions of a plot
*/
declare function plotter(): Chart;
declare function validateInput(inputConfig: InputConfig, inputData: InputData): void;
/**
Receives inputData and inputConfig as input.
Throws error if input contains a mistake
Initializes the doubleSweep and calculates everything necessary for graph drawing with d3
*/
declare function newRelaxedPlot(inputData: InputData, inputConfig: InputConfig): Promise<DotplotReturn>;
/**
Receives a filepath to a CSV file and the inputConfig as input.
Converts the content of the CSV file with d3 parsing to a java object.
Returns an arry with the data, or an error if data not foun
*/
declare function parseFromDataPathAsync(filePath: string): Promise<InputData>;
/**
Recieves a csvString
Converts the input to a Java object with d3 parsing.
saves numbers as numbers, not STrings
*/
declare function parseFromCSVString(csvString: string): InputData;
/**
    execute one relaxation step
    Includes tunnel swap, updating cells
    
*/
declare function relaxationStep(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam, voronoiGl: VoronoiGL, hasColor: boolean): Promise<RelaxStatus>;
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
declare function tunnelSwap(inputConfig: InputConfig, circleData: CircleData, hasColor: boolean): void;
/** update position of cells */
declare function updateCells(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam, delaunay: any): RelaxStatus;
declare class VoronoiGL {
    private gl;
    private ext_cbf;
    private voronoiImage;
    private seedingShader;
    private voronoiShader;
    private visualizeShader;
    private momentumShader;
    private condenseShader;
    private collectShader;
    private overlapShader;
    private kdeTexture;
    private kdeTexWidth;
    private jumpFloodSteps;
    private jumpFloodTextures;
    private voronoiTextures;
    private voronoiFrameBuffers;
    private voronoiIndex;
    private momentumTextures;
    private momentumFrameBuffers;
    private momentumIndex;
    private pointData;
    private pointDataTexture;
    private pointDataNewTexture;
    private pointDataNewFramebuffer;
    private pointDataFramebufferWidth;
    private pointColors;
    private pointColorsTexture;
    private pointTexWidth;
    private readBuffer;
    private rawPixelMapData;
    private pixelMap;
    private rawPointData;
    private pointCount;
    private canvas;
    private ratioX;
    private ratioY;
    private visible;
    private dataURL;
    private rng;
    constructor(inputConfig: InputConfig, container: any);
    /**
     * Small helper function to compile a shader and automatically print the info log
    */
    private compileShaderWithInfo;
    /**
     * Compiles all shaders and creates the necessary programs
    */
    private compileShaders;
    /**
     * Toggles the visibility of the voronoi canvas
    */
    toggleVisibility(): boolean;
    /**
     * Applies texture settings which are used for most textures in this application to ensure proper reading of data values.
     * Parameters will be applied to the currently bound texture.
    */
    private applyDefaultTexParameters;
    /**
     * Will recreate all framebuffers dependant on canvas size and their textures.
     * Should only be called when the canvas size changes.
    */
    private updateFramebuffers;
    /**
     * Updates kde texture.
     * Should only be called when the canvas size changes.
     * Will create the texture if it is undefined.
    */
    updateKdeTexture(inputConfig: InputConfig, kde: KDE, plotParam: PlotParam): void;
    /**
     * Will recreate the texture and framebuffer used for the updated point data.
     * Should only be called when the number of points changes.
     * Will take it's new size from pointTexWidth.
    */
    private updatePointFramebuffer;
    /**
     * Updates point positions texture.
     * Will create the texture if it is undefined.
    */
    updatePointPosTexture(circleData: CircleData): void;
    /**
     * Updates color texture based on the current settings of colorMode
     * Will create the texture if it is undefined.
    */
    updateColorTexture(inputConfig: InputConfig, circleData: CircleData): void;
    /**
     * Updates all textures and framebuffers used to hold data if they need to be updated.
     * For some textures this is the case when the canvas size or point count changes.
    */
    private updateDataTextures;
    /**
     * Mostly taken from https://forum.babylonjs.com/t/speeding-up-readpixels/12739
    */
    private clientWaitAsync;
    /**
     * Mostly taken from https://forum.babylonjs.com/t/speeding-up-readpixels/12739
    */
    private readPixelsAsync;
    /**
     * Calculates a new voronoi diagram and directly uses it to update point positions stored in circleData.
    */
    updateCells(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam): Promise<RelaxStatus>;
    /**
     * Calculates a new voronoi diagram and its visualization which can then be shown.
    */
    updateVoronoiImage(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam): void;
    /**
     * Calculates a new voronoi diagram using the jump-flood algorithm and stores all inbetween steps for later use.
    */
    private calculateVoronoi;
    /**
     * Calculates the momentum of a previously generated voronoi diagram for every individual pixel.
    */
    private momentumFromVoronoi;
    /**
     * Condense the momentum from each pixel into the original voronoi seed positions using the previously stored information about the jump-flood steps.
    */
    private condenseMomentum;
    /**
     * Collect the new point data from the voronoi seed positions and store them in the pointDataTexture.
    */
    private collectPointData;
    /**
     * Will visualize the current voronoi diagram so it can be shown to the user or saved.
    */
    visualizeVoronoi(inputConfig: InputConfig): void;
    /**
     * Will calculate the current overlap of the circles.
    */
    showOverlap(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam): OverlapStatus;
    /**
     * Returns the data URL containing the latest visualization.
    */
    getDataURL(): string;
    private mulberry32;
}
/**
Receives inputData, inputConfig, hasColor, docHeight and the docWidth as input.
Calculates container width, height and aspectRatio.
Loops calculation of the doubleSweep function
and changing of dSingle value for custom aspectRatio.
*/
declare function createPlotDimension(inputConfig: InputConfig, inputData: InputData, hasColor: boolean, docHeight: string, docWidth: string): PlotParam;
/**
Receives inputData, inputConfig and checkColor as input.
Performs the double sweep algorithm with already sorted data
Further details algorithm:
Nonlinear Dot Plots, Rodrigues and Weiskopf
*/
declare function doubleSweep(inputConfig: InputConfig, inputData: InputData, checkColor: boolean, kde: KDE, densMax: number): DoubleSweepResult;
/**
    Upscales data if dSingle smaller than 1
*/
declare function upscaleSweepInput(inputConfig: InputConfig, inputData: InputData, withUpscale?: boolean): UpscaledSweepInput;
/**
    revert upscaling
*/
declare function downscaleSweepOutput(columns: Column[], upscaleFactor: number): Column[];
/**
    creates the object for one circle
*/
declare function newSingleCircle(inputConfig: InputConfig, dataPoint: InputDataObj, diameterDom: number, d3RefID: number, xDom: number, yPix: number, plotParam: PlotParam, blur: number, hasColor: boolean): Circle;
/**
Receives inputData, inputConfig, hasColor and finalSweepResult as input.
Determines all necessary parameters for circles
The return value arrayy of circles
*/
declare function createCircleData(inputConfig: InputConfig, inputData: InputData, hasColor: boolean, plotParam: PlotParam): CircleData;
/**
Receives colorNames and inputConfig as input.
Checks custom color.attributeMap or creates a new one and
calculates the colors array from that mapping
*/
declare function createColors(colorNames: ColorName[], inputConfig: InputConfig): ColorsObject;
/**
Receives colorNames and inputConfig as input.
Throws error if colorNames is missing.
Sorts colorNames with either custom mapping or creates new one that
maps colorNames to normalized scale.
*/
declare function createAttributeMap(colorNames: ColorName[], inputConfig: InputConfig): void;
/**
Receives colorNames and inputConfig as input.
Interpolates colors to simulate a color scale.
Returns the result as an object to map color to color name.
*/
declare function createColorsObject(colorNames: ColorName[], inputConfig: InputConfig): ColorsObject;
/**
    Get color for the error of the circle
*/
declare function colorDisError(inputConfig: InputConfig, circle: Circle): any;
/**
    Get color for the error of the circle position are supersampled
*/
declare function colorDisErrorSupSamp(inputConfig: InputConfig, circle: Circle): string;
/**
    get a color
*/
declare function colorScalePicker(scalar: number): string;
/**
self made scalar domain for the Cool Warm scale
*/
declare function getScalarDomain(): number[];
/**
    Cool Warm color scale
*/
declare function getCoolWarmScale(): string[];
declare let imageKeyword: string;
declare let imageList: ImageList;
declare function getImageList(): ImageList;
declare function getImageURL(imageIndex: string): string;
declare function createGetImages(): void;
/** Helper functions to make adding new datasets easyer and not flood the Image getter too much */
declare function getFaceImages(): ImageList;
/**
    Sorts inputData according to images
*/
declare function sortImage(inputDataSlice: InputData, inputConfig: InputConfig, rng: RNG): InputData;
/**

    Sorts inputData according to the x attribute in ascending order.
*/
declare function sortX(inputData: InputData, xAttribute: string | number): any[];
/**
    Sorts the special input for a KDE
*/
declare function sortKDEinput(kdeInput: KDEinput): KDEinput;
/**
The inputData is assumed to be a slice representing a column.
The column is divided into bins with independent sorting (e.g. different colors or Images)
Then each bin is sortet alternating: smallest, biggest, second-to-smallest, etc.
Receives inputData and inputConfig as input.
Returns inputData sorted for color but alternating in value within each bin
*/
declare function sortAlternating(inputDataSlice: InputData, inputConfig: InputConfig, hasColor: boolean): any[];
/**
Receives inputData and inputConfig as input.
Sorts inputData according to color.attributeMap mapping in ascending order.
*/
declare function sortColor(inputData: InputData, inputConfig: InputConfig, rng: RNG): any[];
/**
Seeded RNG
Mulberry32
*/
declare function mulberry32(a: number): () => number;
/** adds an amount of padding to the given Domain */
declare function addPaddingToDomain(xDomain: Domain): Domain;
/**
Extra function for testing that takes a java object (ready to be used by the graph)
a decimal value (0,1] and a boolean that indicates randomness.
it gives out a split of the data at the given percentage
*/
declare function splitData(inputData: InputData, splitPerc: number, random?: boolean): InputDataObj[];
declare function makeWorkerInput(funcName: WwFunctionName, funcInput: any[]): WwData;
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
declare function boundarySearch(leftEvaluation: any, rightEvaluationFunc: EvalFunction, bigLeft_upX: boolean, boundaries?: SearchBoundaries, startValue?: number): number;
/**
    new search boundary for a boundary search
*/
declare function getNewSearchBoundary(): SearchBoundaries;
/**
    getting the color of a circlke depending on the colormode
*/
declare function getCircleColor(inputConfig: InputConfig, circle: Circle): any;
/**
    returns a nice string to show time
*/
declare function msToTime(duration: number): string;
declare function insertionSort(circleData: CircleData, size: number): CircleData;
/**insertion Sort, but for the original, rather than current position*/
declare function insertionSortOriginal(circleData: CircleData, size: number): CircleData;
/** takes the inputconfig, Plotdim, and an xPix value and returns the densityDom */
declare function xPixToDensPix(inputConfig: InputConfig, plotParam: PlotParam, xPix: number): number;
/** Since Inputdata is already sorted by x we just do a simple insertion */
declare function mergeInputData(inputConfig: InputConfig, inputData: InputData, newInputData: InputData): InputData;
declare function saveSvg(svgEl: any, name: any): void;
/**
Calculates and draws the density of given data on points in xTicks, regarding to attribues in inputConfig. Also adds a new x value to bve considered in the calc, if it's not null
*/
declare function calculateDrawDensity(inputConfig: InputConfig, inputData: InputData, circleData: CircleData, xDomSample: number[], densityPlot: any, plotParam: PlotParam): DensityReturn;
/**
    input for KDE calculation from circleData
*/
declare function getKDEinputFromCircleData(circleData: CircleData): KDEinput;
/**
    input for KDE calculation from inputData
*/
declare function getKDEinputFromInputData(inputConfig: InputConfig, inputData: InputData): KDEinput;
/**
Computes density values at certain points, given by xTicks
*/
declare function getDiscreteDensity(inputConfig: InputConfig, kde: KDE, xDomSample: number[]): DensPoint[];
/**
    returns KDE calculator that can calc the dens for any point on the x-axis
 */
declare function getKDE(inputConfig: InputConfig, kdeInput: KDEinput, xDomSample?: number[]): KDE;
/** get KDE that watches for the boundary*/
declare function getBoundedKDE(inputConfig: InputConfig, kdeInput: KDEinput, xDomSample: number[], boundaryList: BoundaryList): KDE;
/**
callculates a complete new density and redraws the plot
and returns the used density
*/
declare function drawDensity(discreteDens: DensPoint[], densityPlot: any, plotParam: PlotParam): void;
/**
    creates a special version of ticks on the xAxis with the first and the last point def inside
*/
declare function getXdomSample(sampleRate: number, plotParamKDE: PlotInfosKDE): number[];
/**
returns a function to get the padded radius of a circle.
*/
declare function getPadRadFunct(inputConfig: InputConfig): (radius: number) => number;
/**returns the list of boundarys for density plotting*/
declare function getBoundaryList(inputConfig: InputConfig, inputData: InputData, kde: KDE): BoundaryList;
