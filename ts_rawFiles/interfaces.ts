/* interfaces */

// external libraries
declare let d3: any;
declare let dat: any;
declare let saveAs: Function;
declare let Delaunay: any;
declare let saveSvgAsPng: Function;

type GUI = any;

type InputData = InputDataObj[];

interface DotplotReturn {
    inputConfig: InputConfig,
    plotParam: PlotParam,
    func: GUIFunctions
}

interface InputDataObj {
    [key: string]: any
}

interface InputConfig {
    containerId?: string
    ,xAttribute?: keyof InputDataObj
    ,dots?: DotsConfig
    ,color?: ColorConfig
    ,xTicks?: number
    ,blur?:BlurConfig
    ,margin?: number
    ,aspect?:AspectConfig
    ,xLabel?: any
    ,randomSeed?: number
    ,density?:DensityConfig
    ,relaxing?:RelaxingConfig
    ,images?: ImagesConfig
    ,extraInfo?: ExtraInfo
    ,debugMeasurements?: boolean
}


enum StudyModeEnum{
    pick,
    compare,
    density,
}

interface ExtraInfo {
    dotCount?: number
    ,sweepRuntime?: number
    ,plotRuntime?: number
}


interface EvalOutput {
    plotsettings?: InputConfig
    ,metrics?: Metrics
    ,history?: MetricsHistory
}

interface Metrics {
    relaxRuntime?: number
    ,totalRuntime?: number
    // squared placing error
    ,SSE?: number
    ,MSE?: number
    // Movement error
    ,SDM?: number
    ,MDM?: number
    // Movement error squared
    ,SSM?: number
    ,MSM?: number
    // Overlap in diameter percentage
    ,SOD?: number
    ,MOD?: number
    // Overlap in pixel
    ,SOP?: number
    ,MOP?: number
}

interface MetricsHistory {
    stepRuntime?: number[]
    // squared placing error
    ,SSE?: number[]
    ,MSE?: number[]
    // Movement error
    ,SDM?: number[]
    ,MDM?: number[]
    // Movement error squared
    ,SSM?: number[]
    ,MSM?: number[]
    // Overlap in diameter percentage
    ,SOD?: number[]
    ,MOD?: number[]
    // Overlap in pixel
    ,SOP?: number[]
    ,MOP?: number[]
}

interface OverlapStatus{
    SOP?: number
    ,MOP?: number
}

interface DotsConfig {
    dSingle?: number
    ,radiusMode: keyof typeof RadiusModeEnum
    ,dotscaling?: DotscaleReturn
    ,circlePadding?: number
    ,border?: boolean
}

enum DotsColorModeEnum {
    normal
    ,error
}

enum OneDotModeEnum {
    normal
    ,linear
    ,constant
}

type OneDotMode = keyof typeof OneDotModeEnum;

enum RadiusModeEnum {
    column
    ,kde
}

interface ColorConfig {
    attribute?: keyof InputDataObj
    ,scale?: ColorScale[]
    ,attributeMap?: AttributeMap | null
    ,differenceTolerance?: number
    ,colorMode?: keyof typeof DotsColorModeEnum
}

interface AspectConfig {
    ratio?: number
    ,iter?: number
}

interface BlurConfig {
    edge?:number
    ,val?:number
    ,ramp?:number
    ,gapDistance?:number
}

interface DensityConfig {
    bandwidth?: number
    ,dSingleBandwidth?: boolean
    ,kernel?: KernelReturn
    ,balloonEstimator?: BallonEstimatorConfig
    ,sampleRate?: number
    ,useBoundary?: boolean
}

interface BallonEstimatorConfig {
    active?: boolean
    ,constant?: number
}


interface Circle {
    d3RefID: number
    // URL of the image that can be used insead of a circle
    URL: string
    // original (wanted) position in pixel and domain value
    ,origXpix: number
    ,origXdom: number
    // position in pixel value
    ,xPix: number
    ,yPix: number
    // radius in Pixel value
    ,radiusPix: number
    // orig color is color at creation
    ,origColor: any
    ,errorColor: any
    ,coverageColor: any
    // description on mouse over
    ,desc: string
    // blur strength
    ,blur: number
}

type CircleData = Circle[];

// maps dot ID to their d3-Dot on screen (ID, not CircleData Index)
interface CirclesD3Ref {
    [key: number]: D3Ref
}

interface D3Ref {
    colorCircle?: any
    ,image?: any
}

interface RectsD3Ref {
    [key: number]: any
}

interface Column {
    xPos: number
    ,c: number
    ,colDiameterDom: number
    ,startIndex: number
}

interface PlotInfosKDE {
    xDomain: Domain
    ,xAxisScale: any
}

interface PlotParam {
    height: number
    ,width: number
    ,xDomain: Domain
    ,xDomainWidth: number
    ,yDomain: Domain
    ,xAxisScale: any
    ,yAxisScale: any
    ,columns: Column[]
    
    ,colorNames: any[]
    ,colors?: ColorsObject

    ,domainToPixel: number
    ,xAxisHeight: number
    // supersample
    ,supSampHeight?: number
    ,supSampWidth?: number
    // list of boundaries for KDE
    ,boundaryList: BoundaryList
    // KDE
    ,kde: KDE
    // ,boundedKDE: KDE
    ,updateTextures: boolean
    // function to pad radius of circle
    ,padRadFunct: (radius: number)=>number
}

interface DoubleSweepResult {
    columns: Column[]
    ,highestColumn: number
    ,highestPlotPointDom: number
    ,colorNames: any[]
}

// result of upscaling the input
interface UpscaledSweepInput {
    upscaleFactor: number
    ,dSingleSweep: number
    , inputDataSweep: InputData
}



/* Boundary Search */


interface BestRatioResult {
    dSingle: number
    ,aspectRatioDifference: number
}

interface BestHeightResult {
    height: number
    ,densityAbsDifference: number
}

interface BestDiameterResult {
    diameter: number
    ,equationDifference: number
}

interface BestSearchResult {
    testValue: number
    ,absEquationDifference: number
}

interface SearchBoundaries {
    lowerBoundary?: number
    ,hasUpperBoundary?: boolean
    ,upperBoundary?: number
}

// saves previous C to Diameter results
type CToDiamDatabase = {
    [key: string]: number
}

type EvalFunction = (testValue?: number)=>number;


// Density

type AddData = (newData: InputData)=>void;
type RemoveData = (id: number)=>void;


// all usable dotscaling names
enum DotscaleNameEnum {
    linear
    ,root
    ,log
}

type DotscaleFunction = (c?: number, dSingle?: number) => number;
type DotscaleName = keyof typeof DotscaleNameEnum;
type ScaleDensityDom = (density: number, dSingle: number) => number;
type ScaleDensDiamDom = (density: number, dSingle: number) => number;

interface DotscaleReturn {
    name: DotscaleName
    ,oneDotMode: OneDotMode
    ,scaleInput: number
    ,columnToDiamDom: DotscaleFunction
    ,scaleDensityDom: ScaleDensityDom
    ,scaleDensDiamDom: ScaleDensDiamDom
};

// Table for log scale boundaries
interface LogTable {
    height: number
    ,density: number
}


// all usable kernel names
enum KernelNameEnum {
    gaus
    ,uni
    ,epa
    ,cir
}
type Kernel = (u: number, bandwidth: number) => number;
type KernelName = keyof typeof KernelNameEnum;
type KernelSquaredIntegral = (bandwidth: number) => number;

interface KernelReturn {
    name: KernelName
    ,kernelFunction: Kernel
    ,kernelSquaredIntegral: KernelSquaredIntegral
};

// Density
type KDE = (xPos: number) => number;
type DensityReturn = DensPoint[];

type KDEinput = KDEinputEntry[];

// for the kde we need the x values
interface KDEinputEntry {
    xDom: number
    // deprecated for now
    ,radiusPix: number
}



// the densityy curve is an array of density points
interface DensPoint {
    xDom: number
    ,densityDom: number
}


type Domain = [number, number];

type AttributeMap = (value: any) => number;

interface LinearScaleFkt extends Function {
    domain: any;
}

interface ColorScale {
    color: string
    ,position?: number
}


/* Color */

type ColorName = string|number;


type ColorsObject = {
    [key in ColorName]: any
}

interface HSLcolor {
    h: number
    ,s: number
    ,l: number
    ,opacity: number
}

/* Webworker */
interface WwData {
    funcName: string
    ,funcInput: any[]
}

// enum for all possible functions usable via webworker postmessage
enum WwFunctionNameEnum {
}

type WwFunctionName = keyof typeof WwFunctionNameEnum;

interface NewRads {
    [key: number]: number
}

// Plotter Chart
interface Chart{
    (selection: any): void;
    inputConfig(input: InputConfig): Chart;
    inputData(input: InputData): Chart;
    plotParam(input: PlotParam): Chart;
    hasColor(input: boolean): Chart;
    dotplotReturn(): DotplotReturn;
}

interface GUIFunctions {
    nextRelaxingSteps: Function,

    redrawGraph: ()=>Promise<DotplotReturn>,
    redrawDensity: Function,

    updateXTicks: Function,
    updateDotColor: Function,
    updateDotRads: Function,
    updateVoronoi: Function,

    printCircleError: Function,
    exportLayoutToTxt: Function,
    saveInputconfig: Function,
    copyVoronoiURL: Function,
    savePlotSVG: Function,

    getOverlap: Function,
    toggleVoronoi: Function,
    toggleDots: Function,
    toggleLowOpaDots: Function,
    toggleDens: Function,
    toggleAxis: Function,
    toggleAxisFull: Function,
}




/* Strippling */

type RNG = ()=>number;

enum VoronoiColorModeEnum {
    normal
    ,error
    ,coverage
}

enum RelaxVoronoiModeEnum {
    cone
    ,flood
}

enum RelaxXCorrectionTypeEnum {
    force
    ,linearArea
    ,circleArea
}

interface CirclePixel {
    [key: number]: number
}

interface Moments {
    [key: number]: MomentsEntry
}

interface MomentsEntry {
    moment00?: number
    ,moment10?: number
    ,moment01?: number
};

interface RelaxingConfig {
    iter?: number
    ,supSampFactor?: number
    ,colorMode?: keyof typeof VoronoiColorModeEnum
    ,voronoiMode?: keyof typeof RelaxVoronoiModeEnum
    ,errorScale?: number
    ,xCorrection?: number
    ,xCorrectionType?: keyof typeof RelaxXCorrectionTypeEnum

    // weights for x and y direction offset during relaxing
    ,xOffsetWeight?: number
    ,yOffsetWeight?: number

    ,stopThreshold?: number
    ,overlapUsePadding?: boolean
    // use webGL for voronoi creation or not
    ,useWebGL?: boolean
    ,squichDots?: boolean
}

// status after one relaxation step
interface RelaxStatus {
    sumDotMove?: number
    ,squaredSumDotMove?: number
    ,sumSquaredError?: number
    
}

interface PixelMapEntry {
    dotKey?: number
}

type PixelMap = PixelMapEntry[];

interface ColorRGB {
    r: number
    ,g: number
    ,b: number
}

interface ImagesConfig {
    useImages?:boolean
    ,attribute?: keyof InputDataObj
    ,imageBorderPerc?:number
}

interface ImageList {
    [key: string]: {fileName: string, order: number}
}

type BoundaryList = BoundaryEntry[];

interface BoundaryEntry {
    xDom: number
    //,length: number
    ,isRight: boolean
}

interface BinCollection {
    [key: number]: InputData
}


interface DistList {
    [key: number]: OneDotDist
}

interface OneDotDist {
    [key: number]: number
}

// coordinates, cannot name "Coordiantes" in typescript
interface Coords {
    x?: number
    ,y?: number
}