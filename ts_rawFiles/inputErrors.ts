function validateInput(inputConfig: InputConfig, inputData: InputData){
    // error helpers
    let attributeMapType: string;
    let colorAttributeType: string;
    let helpArray: any[];

    /** Basic input */
    if (Object.prototype.toString.call(inputData) != '[object Array]') {
        throw new Error("inputData must be an Array");
    } else if (inputData.length === 0) {
        throw new Error("inputData is empty");

    } else if (Object.prototype.toString.call(inputConfig.containerId) != '[object String]') {
        throw new Error("containerId must be a String");
    } else if (document.getElementById(inputConfig.containerId) === null) {
        throw new Error("containerId not found. Looked for: \"" + inputConfig.containerId + "\"");

    } else if (Object.prototype.toString.call(inputConfig.xAttribute) != '[object String]') {
        throw new Error("xAttribute must be a String");
    } else if (!(inputConfig.xAttribute in inputData[0])) {
        throw new Error("xAttribute not found in data. Looked for: \"" + inputConfig.xAttribute + "\"");

    } else if (Object.prototype.toString.call(inputConfig.xTicks) != '[object Number]') {
        throw new Error("xTicks must be a Number");
    } else if (inputConfig.xTicks < 0) {
        throw new Error("xTicks must be positive, is: \"" + inputConfig.xTicks + "\"");

    } else if (Object.prototype.toString.call(inputConfig.margin) != '[object Number]') {
        throw new Error("margin must be a Number");
    } else if (inputConfig.margin < 0) {
        throw new Error("margin must be positive, is: \"" + inputConfig.margin + "\"");
    
    } else if (Object.prototype.toString.call(inputConfig.randomSeed) != '[object Number]') {
        throw new Error("randomSeed must be a Number");
    

    } else if (Object.prototype.toString.call(inputConfig.debugMeasurements) != '[object Boolean]') {
        throw new Error("debugMeasurements must be a Boolean");
    }


    /** Dots Config */
    if (Object.prototype.toString.call(inputConfig.dots.dSingle) != '[object Number]') {
        throw new Error("dots.dSingle must be a Number");
    } else if (inputConfig.dots.dSingle <= 0) {
        throw new Error("dots.dSingle should be greater than 0, is: \"" + inputConfig.dots.dSingle + "\"");

    } else if (!getKeysFromEnum(RadiusModeEnum).includes(inputConfig.dots.radiusMode)) {
        throw new Error("dots.radiusMode has to be one of [" + getKeysFromEnum(RadiusModeEnum) + "] , is : \"" + inputConfig.dots.radiusMode + "\"");

    } else if (inputConfig.dots.dotscaling.name === undefined) {
        throw new Error("inputConfig.dots.dotscaling should only be set via the dotscaling class");

    } else if (Object.prototype.toString.call(inputConfig.dots.circlePadding) != '[object Number]') {
        throw new Error("dots.circlePadding must be a Number");
    } else if (inputConfig.dots.circlePadding < 0 || inputConfig.dots.circlePadding > 1) {
        throw new Error("dots.circlePadding should be within [0,1], is: \"" + inputConfig.dots.circlePadding + "\"");
    
    } else if (Object.prototype.toString.call(inputConfig.dots.border) != '[object Boolean]') {
        throw new Error("dots.border must be a Boolean");

    }


    /** Color Config */
    attributeMapType = Object.prototype.toString.call(inputConfig.color.attributeMap);
    colorAttributeType = Object.prototype.toString.call(inputConfig.color.attribute);

    if (colorAttributeType != '[object String]' && colorAttributeType != '[object Null]') {
        throw new Error("color.attribute must be a String or Null");
    } else if (!(inputConfig.color.attribute in inputData[0]) && inputConfig.color.attribute != "" && inputConfig.color.attribute != null) {
        throw new Error("color.attribute not found in data. Looked for: \"" + inputConfig.color.attribute + "\"");

    } else if (Object.prototype.toString.call(inputConfig.color.scale) != '[object Array]') {
        throw new Error("color.scale must be an Array");
    } else if (inputConfig.color.scale.length === 0) {
        throw new Error("color.scale should not be an empty array");

    } else if (attributeMapType != '[object Function]' && attributeMapType != '[object Null]' ) {
        throw new Error("color.attributeMap must be a Function or Null");

    } else if (Object.prototype.toString.call(inputConfig.color.differenceTolerance) != '[object Number]') {
        throw new Error("color.differenceTolerance must be a Number");

    } else if (!getKeysFromEnum(DotsColorModeEnum).includes(inputConfig.color.colorMode)) {
        throw new Error("color.colorMode has to be one of [" + getKeysFromEnum(DotsColorModeEnum) + "] , is : \"" + inputConfig.color.colorMode + "\"");
    }

    //validate positions and color if color is used
    if ((inputConfig.color.attribute in inputData[0])) {
        if (inputConfig.color.scale.length === 1) {
            // Only one color (no need for position)
            inputConfig.color.scale[0].position = 1;
            if (Object.prototype.toString.call(inputConfig.color.scale[0].color) != '[object String]') {
                throw new Error("color in color.scale must be a String");
            }
        } else {
            inputConfig.color.scale.forEach((item, index) => {
                if (Object.prototype.toString.call(item.color) != '[object String]') {
                    throw new Error("color in color.scale must be a String");
                }
                if (!("position" in item)) {
                    throw new Error("Position for color: \"" + item.color + "\" is missing");
                } else if (item.position < 0 || item.position > 1) {
                    throw new Error("Position for color: \"" + item.color + "\" must be within [0,1], but is: \"" + item.position + "\"");
                }
            });
        }
    }


    /** Aspect Config */
    if (Object.prototype.toString.call(inputConfig.aspect.ratio) != '[object Number]') {
        throw new Error("aspect.ratio must be a Number");

    } else if (inputConfig.density.kernel.name === undefined) {
        throw new Error("inputConfig.density.kernel should only be set via the kernel class");

    } else if (Object.prototype.toString.call(inputConfig.aspect.iter) != '[object Number]') {
        throw new Error("aspect.iter must be a Number");
    } else if (inputConfig.aspect.iter <= 0) {
        throw new Error("aspect.iter should be greater than 0, is: \"" + inputConfig.aspect.iter + "\"");
    }

    /** Density Config */
    if (Object.prototype.toString.call(inputConfig.density.bandwidth) != '[object Number]') {
        throw new Error("density.bandwidth must be a Number");
    } else if (inputConfig.density.bandwidth <= 0) {
        throw new Error("density.bandwidth should be greater than 0, is: \"" + inputConfig.density.bandwidth + "\"");

    } else if (Object.prototype.toString.call(inputConfig.density.sampleRate) != '[object Number]') {
        throw new Error("density.sampleRate must be a Number");
    }


    /** Relaxing Config */
    if (Object.prototype.toString.call(inputConfig.relaxing.iter) != '[object Number]') {
        throw new Error("relaxing.iter must be a Number");
    } else if (inputConfig.relaxing.iter <= 0) {
        throw new Error("relaxing.iter should be greater than 0, is: \"" + inputConfig.relaxing.iter + "\"");
    
    } else if (Object.prototype.toString.call(inputConfig.relaxing.supSampFactor) != '[object Number]') {
            throw new Error("relaxing.supSampFactor must be a Number");

    } else if (!getKeysFromEnum(VoronoiColorModeEnum).includes(inputConfig.relaxing.colorMode)) {
        throw new Error("relaxing.colorMode has to be one of [" + getKeysFromEnum(VoronoiColorModeEnum) + "] , is : \"" + inputConfig.relaxing.colorMode + "\"");

    } else if (!getKeysFromEnum(RelaxVoronoiModeEnum).includes(inputConfig.relaxing.voronoiMode)) {
        throw new Error("relaxing.colorMode has to be one of [" + getKeysFromEnum(RelaxVoronoiModeEnum) + "] , is : \"" + inputConfig.relaxing.voronoiMode + "\"");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.errorScale) != '[object Number]') {
        throw new Error("relaxing.errorScale must be a Number");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.xCorrection) != '[object Number]') {
        throw new Error("relaxing.xCorrection must be a Number");

    } else if (!getKeysFromEnum(RelaxXCorrectionTypeEnum).includes(inputConfig.relaxing.xCorrectionType)) {
        throw new Error("relaxing.colorMode has to be one of [" + getKeysFromEnum(RelaxXCorrectionTypeEnum) + "] , is : \"" + inputConfig.relaxing.xCorrectionType + "\"");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.xOffsetWeight) != '[object Number]') {
        throw new Error("relaxing.xOffsetWeight must be a Number");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.yOffsetWeight) != '[object Number]') {
        throw new Error("relaxing.yOffsetWeight must be a Number");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.stopThreshold) != '[object Number]') {
        throw new Error("relaxing.stopThreshold must be a Number");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.overlapUsePadding) != '[object Boolean]') {
        throw new Error("relaxing.overlapUsePadding must be a Boolean");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.useWebGL) != '[object Boolean]') {
        throw new Error("relaxing.useWebGL must be a Boolean");

    } else if (Object.prototype.toString.call(inputConfig.relaxing.squichDots) != '[object Boolean]') {
        throw new Error("relaxing.squichDots must be a Boolean");

    }

    /** Images Config */
    if (inputConfig.images.useImages && inputConfig.images.attribute === null) {
        throw new Error("images.useImages is set to true, though no images.attribute was provided");
    } else if (inputConfig.images.useImages && !( inputConfig.images.attribute in inputData[0])) {
        throw new Error("images.attribute not found in data. Looked for: \"" + inputConfig.images.attribute + "\"");
    }


    /** Blur Config */
    if (Object.prototype.toString.call(inputConfig.blur.edge) != '[object Number]') {
        throw new Error("blur.edge must be a Number");

    } else if (Object.prototype.toString.call(inputConfig.blur.val) != '[object Number]') {
        throw new Error("blur.val must be a Number");

    } else if (Object.prototype.toString.call(inputConfig.blur.ramp) != '[object Number]') {
        throw new Error("blur.ramp must be a Number");
    } else if (inputConfig.blur.ramp < 0) {
        throw new Error("blur.ramp should be 0 or greater, is: \"" + inputConfig.blur.ramp + "\"");

    } else if (Object.prototype.toString.call(inputConfig.blur.gapDistance) != '[object Number]') {
        throw new Error("blur.gapDistance must be a Number");

    }

    /* 
        get enum entries as array to simplify making sure only valid enum entries are used
    */
    function getKeysFromEnum(enumInput: Record<any, any>){
        helpArray = Object.values(enumInput);
        // array has all names, then all indices. So we slice off indices
        return helpArray.slice(0,helpArray.length/2);
    }
}

