/**
gives out the object saved in InputConfig without any functions
*/
class dotscaling {

    // function for a linear dotplot
    static linear(): DotscaleReturn {
        return {
            name: "linear"
            , oneDotMode: "normal"
            , scaleInput: -1
            , columnToDiamDom: (c, dSingle) => dSingle
            , scaleDensityDom: (density, dSingle) => density * dSingle * dSingle
            , scaleDensDiamDom: (density, dSingle) => dSingle
        };
    }

    /** root function */
    static root(r: number, oneDotMode: OneDotMode = "constant"): DotscaleReturn {

        if (r < 0 || 1 <= r) {
            throw new Error("Input for a root dotscale must be within [0, 1), is: " + r);
        }

        let scaleDensityRoot: ScaleDensityDom = (density, dSingle) => (Math.pow(density * dSingle, (1 - r) / (1 + r)) * dSingle);
        const scaleDensityRootFinal: ScaleDensityDom = dotscaling.changeOneDotMode(scaleDensityRoot, oneDotMode);
        return {
            name: "root"
            , oneDotMode: oneDotMode
            , scaleInput: r
            , columnToDiamDom: (c, dSingle) => dSingle / Math.pow(c, r)
            , scaleDensityDom: scaleDensityRootFinal
            , scaleDensDiamDom: (density, dSingle) => { return Math.sqrt(scaleDensityRoot(density, dSingle) / density) }
        };
    }

    /** log function with boundary search to get result height */
    static log(b: number, oneDotMode: OneDotMode = "constant"): DotscaleReturn {

        if (b < 2) {
            // base can't be smaller than 2, since root would become negative
            throw new Error("Base for a log dotscale must be greater or equal 2, is: " + b);
        }


        const scaleDensityLog: ScaleDensityDom = (density, dSingle) => {
            // formula does not work for density of 0
            if (density === 0) {
                return 0
            }

            let startValue: number;
            let boundary: SearchBoundaries = getNewSearchBoundary();

            // one known point at density === 1/dSingle -> scaled value === dSingle
            if (density === 1 / dSingle) {
                // density is equal to known point
                return dSingle;
            } else if (density < 1 / dSingle) {
                // density is lower than known point: new upperBoundary found
                boundary.upperBoundary = dSingle;
                boundary.hasUpperBoundary = true;
                startValue = (boundary.lowerBoundary + boundary.upperBoundary) / 2;
            } else {
                // density is higher than known point: new lowerBoundary found
                boundary.lowerBoundary = dSingle;
                startValue = 2 * dSingle;
            }


            // root (zero point) of function:
            let root: number = (dSingle * Math.log(b - 1)) / Math.log(b);
            // Formula from "density scale idea - log.pdf"
            let origLogFormula = (height: number) => { return Math.pow(Math.pow(b, height / dSingle) - b + 1, 2) / height };
            let densityTestFunction: EvalFunction;


            // Density around 1/dSingle has special cases
            if (density === 1 / dSingle) {
                // resulting scaled dens is always dSingle
                return dSingle;
            } else if (density < 1 / dSingle) {
                // special log function
                // see desmos plot in "Info/Stuff"
                densityTestFunction = (height: number) => { return origLogFormula(height + root) / (origLogFormula(dSingle + root) * dSingle) };
            } else {
                // standart log function
                densityTestFunction = origLogFormula;
            }

            return boundarySearch(density, densityTestFunction, true, boundary, startValue);
        }
        const scaleDensityLogFinal: ScaleDensityDom = dotscaling.changeOneDotMode(scaleDensityLog, oneDotMode);
        return {
            name: "log"
            , oneDotMode: oneDotMode
            , scaleInput: b
            , columnToDiamDom: (c, dSingle) => ((Math.log(c + b - 1) / Math.log(b)) / c) * dSingle
            , scaleDensityDom: scaleDensityLogFinal
            , scaleDensDiamDom: (density, dSingle) => { return Math.sqrt(scaleDensityLogFinal(density, dSingle) / density) }
        };


    }

    /** 
        Change the effect when dens < 1/dSingle
    */
    private static changeOneDotMode(scaleDensityDom: ScaleDensityDom, oneDotMode: OneDotMode): ScaleDensityDom {
        // if oneDotMode is not normal we change the behavious below 1/dSingle
        switch (oneDotMode) {
            case "normal":
                return scaleDensityDom;
            case "linear":
                return (density, dSingle) => {
                    if (density <= 1 / dSingle) {
                        return density * dSingle * dSingle;
                    } else {
                        return scaleDensityDom(density, dSingle);
                    }
                }
            case "constant":
                return (density, dSingle) => {
                    if (density === 0) {
                        return 0;
                    } else if (density <= 1 / dSingle) {
                        return dSingle;
                    } else {
                        return scaleDensityDom(density, dSingle);
                    }
                }
            default:
                break;
        }
    }

}



/**
Provides premade Kernel for density computing
*/
class kernel {

    /** Gaussian Kernel Bandwidth INSIDE Kernel */
    static gaussian(): KernelReturn {
        // factor = 3 -> 99,73% of kernel area
        // factor = 3.5 -> 99,95% of kernel area
        // factor = 4 => 99,98% of kernel area
        const SIGMA_FACTOR = 3;
        return {
            name: "gaus"
            , kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    let sigma = (bandwidth / SIGMA_FACTOR);
                    return ((1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.pow(Math.E, (-1 / 2) * Math.pow((u / sigma), 2)));
                } else {
                    return 0;
                }
            }
            , kernelSquaredIntegral: (bandwidth) => {
                return SIGMA_FACTOR * erf(SIGMA_FACTOR) / (2 * Math.sqrt(Math.PI) * bandwidth)
            }
        };
    };
    /** Uniform Kernel Bandwidth INSIDE Kernel */
    static uniform(): KernelReturn {
        return {
            name: "uni"
            , kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    return (1 / (2 * bandwidth));
                } else {
                    return 0;
                }
            }
            , kernelSquaredIntegral: (bandwidth) => {
                return 1 / (2 * bandwidth)
            }
        };
    };

    /** Epanechnikov (parabolic) Kernel (changed to incoorporate bandwidth) */
    static epanechnikov(): KernelReturn {
        return {
            name: "epa"
            , kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    return (3 / (4 * bandwidth)) * (1 - Math.pow(u / bandwidth, 2));
                } else {
                    return 0;
                }
            }
            , kernelSquaredIntegral: (bandwidth) => {
                return (9 * Math.pow(bandwidth, 2) + 3) / (8 * Math.pow(bandwidth, 3))
            }
        };
    };

    /** Kernel based of the area of a circle with the bandwisth as radius */
    static circleArea(): KernelReturn {
        return {
            name: "cir"
            , kernelFunction: (u, bandwidth) => {
                if (Math.abs(u) <= bandwidth) {
                    return (2 * Math.sqrt((bandwidth * bandwidth) - (u * u))) / (Math.PI * bandwidth * bandwidth);
                } else {
                    return 0;
                }
            }
            , kernelSquaredIntegral: (bandwidth) => {
                return -1
            }
        };
    };
}

/**  error function, License: public domain */
function erf(x) {
    // constants
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;

    // Save the sign of x
    var sign = 1;
    if (x < 0) {
        sign = -1;
    }
    x = Math.abs(x);

    // A&S formula 7.1.26
    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

