/**
Receives colorNames and inputConfig as input.
Checks custom color.attributeMap or creates a new one and
calculates the colors array from that mapping
*/
function createColors(colorNames: ColorName[], inputConfig: InputConfig): ColorsObject {
    createAttributeMap(colorNames, inputConfig);
    return createColorsObject(colorNames, inputConfig);
}

/**
Receives colorNames and inputConfig as input.
Throws error if colorNames is missing.
Sorts colorNames with either custom mapping or creates new one that
maps colorNames to normalized scale.
*/
function createAttributeMap(colorNames: ColorName[], inputConfig: InputConfig): void {
    //no values for colorNames found
    if (colorNames.length === 0) {
        throw new Error("no values found for color.attribute: " + inputConfig.color.attribute);
    };

    if (inputConfig.color.attributeMap === null) {
        // no custom color.attributeMap
        let tempAttributeMap = (colorNames: any[]) => {
            if (colorNames.length === 1) {
                // no idea if important
                // console.warn("There is only one value type for the given color.attribute: \"" + inputConfig.color.attribute + "\". This means that setting no color.attribute at all might be prefarable.");
                return (value: any) => {
                    return 0;
                }
            };
            let currentType: string = "none";
            for (let value of colorNames) {
                if (currentType === "none") {
                    currentType = typeof value;
                } else if (currentType != typeof value) {
                    console.warn("Mixed types found for values in color.attribute \"" + inputConfig.color.attribute + "\". This can have unwanted effects on the automatic mapping");
                    break;
                }
            };
            if (currentType === "string") {
                //sort per String
                colorNames.sort((a, b) => { return a.toString().localeCompare(b); });
            } else {
                //numerical Sort
                colorNames.sort((a, b) => { return a - b; });
            }
            return (value: any) => {
                return colorNames.indexOf(value) / (colorNames.length - 1);
            }
        }
        inputConfig.color.attributeMap = tempAttributeMap(colorNames);
    } else {
        // check custom mapping
        colorNames.forEach((item, index) => {
            if (inputConfig.color.attributeMap(item) < 0 || inputConfig.color.attributeMap(item) > 1) {
                throw new Error("Color attribute: \"" + item + "\" is mapped to: " + inputConfig.color.attributeMap(item) + ", but should have been within [0,1]!");
            }
        });
        colorNames.sort((a, b) => { return inputConfig.color.attributeMap(a) - inputConfig.color.attributeMap(b); });
    }
}

/**
Receives colorNames and inputConfig as input.
Interpolates colors to simulate a color scale.
Returns the result as an object to map color to color name.
*/
function createColorsObject(colorNames: ColorName[], inputConfig: InputConfig): ColorsObject {
    // for color interpolation
    let colorInterpolation: Function; //both colors
    let linearScale: LinearScaleFkt = d3.scaleLinear().range([0, 1]); //normalized to [0,1]
    let scaledAttr: number;
    // indexing
    let posIndex: number = 0;
    let firstIndex: number;
    let newestIndex: number;

    let colors: ColorsObject = {};

    // sort colorScale by positions
    inputConfig.color.scale.sort((a, b) => { return a.position - b.position; });

    for (let attribute of colorNames) {
        //test for last and first color
        if (inputConfig.color.scale[0].position > inputConfig.color.attributeMap(attribute)) {
            colors[attribute] = inputConfig.color.scale[0].color;
            continue;
        } else if (inputConfig.color.scale[inputConfig.color.scale.length - 1].position < inputConfig.color.attributeMap(attribute)) {
            colors[attribute] = inputConfig.color.scale[inputConfig.color.scale.length - 1].color;
            continue;
        }
        // first color selection for interpolation
        while (inputConfig.color.scale[posIndex].position < inputConfig.color.attributeMap(attribute)) {
            firstIndex = posIndex;
            posIndex++;
        }

        //position equals attribute mapping or no color position prior
        if (inputConfig.color.scale[posIndex].position === inputConfig.color.attributeMap(attribute)) {
            newestIndex = posIndex;
            // no out of bounds plz
            if ((newestIndex + 1) != inputConfig.color.scale.length) {
                //always takes the last color if multiple have same position
                while (inputConfig.color.scale[newestIndex + 1].position === inputConfig.color.attributeMap(attribute)) {
                    newestIndex++;
                    if ((newestIndex + 1) === inputConfig.color.scale.length) {
                        break;
                    }
                }
            }
            colors[attribute] = inputConfig.color.scale[newestIndex].color;
            continue;
        }

        //first color is saved, second color is at posIndex. Interpolation can beginn
        colorInterpolation = d3.interpolate(inputConfig.color.scale[firstIndex].color, inputConfig.color.scale[posIndex].color);
        // normalize the color positions
        linearScale.domain([inputConfig.color.scale[firstIndex].position, inputConfig.color.scale[posIndex].position]);
        // scale the attribute position
        scaledAttr = linearScale(inputConfig.color.attributeMap(attribute));
        // get color from interpolation
        colors[attribute] = colorInterpolation(scaledAttr);

    }
    return colors;
}

/**
    Get color for the error of the circle
*/
function colorDisError(inputConfig: InputConfig, circle: Circle): any {
    let placingError = circle.xPix - circle.origXpix;
    let relativeError = placingError / circle.radiusPix;

    return colorScalePicker((relativeError + 1) / 2);
}
/**
    Get color for the error of the circle position are supersampled
*/
function colorDisErrorSupSamp(inputConfig: InputConfig, circle: Circle) {
    let placingError = circle.xPix / inputConfig.relaxing.supSampFactor - circle.origXpix / inputConfig.relaxing.supSampFactor;
    let relativeError = placingError / circle.radiusPix;
    return colorScalePicker((relativeError + 1) / 2);
}

/**
    get a color
*/
function colorScalePicker(scalar: number): string {

    let colors = d3.scaleLinear()
        .domain(getScalarDomain())
        .range(getCoolWarmScale());
    // clamp all scalars to scale
    colors.clamp(true);
    return colors(scalar);
}

/**
self made scalar domain for the Cool Warm scale
*/
function getScalarDomain() {
    return [0,
        0.00390625,
        0.0078125,
        0.01171875,
        0.015625,
        0.01953125,
        0.0234375,
        0.02734375,
        0.03125,
        0.03515625,
        0.0390625,
        0.04296875,
        0.046875,
        0.05078125,
        0.0546875,
        0.05859375,
        0.0625,
        0.06640625,
        0.0703125,
        0.07421875,
        0.078125,
        0.08203125,
        0.0859375,
        0.08984375,
        0.09375,
        0.09765625,
        0.1015625,
        0.10546875,
        0.109375,
        0.11328125,
        0.1171875,
        0.12109375,
        0.125,
        0.12890625,
        0.1328125,
        0.13671875,
        0.140625,
        0.14453125,
        0.1484375,
        0.15234375,
        0.15625,
        0.16015625,
        0.1640625,
        0.16796875,
        0.171875,
        0.17578125,
        0.1796875,
        0.18359375,
        0.1875,
        0.19140625,
        0.1953125,
        0.19921875,
        0.203125,
        0.20703125,
        0.2109375,
        0.21484375,
        0.21875,
        0.22265625,
        0.2265625,
        0.23046875,
        0.234375,
        0.23828125,
        0.2421875,
        0.24609375,
        0.25,
        0.25390625,
        0.2578125,
        0.26171875,
        0.265625,
        0.26953125,
        0.2734375,
        0.27734375,
        0.28125,
        0.28515625,
        0.2890625,
        0.29296875,
        0.296875,
        0.30078125,
        0.3046875,
        0.30859375,
        0.3125,
        0.31640625,
        0.3203125,
        0.32421875,
        0.328125,
        0.33203125,
        0.3359375,
        0.33984375,
        0.34375,
        0.34765625,
        0.3515625,
        0.35546875,
        0.359375,
        0.36328125,
        0.3671875,
        0.37109375,
        0.375,
        0.37890625,
        0.3828125,
        0.38671875,
        0.390625,
        0.39453125,
        0.3984375,
        0.40234375,
        0.40625,
        0.41015625,
        0.4140625,
        0.41796875,
        0.421875,
        0.42578125,
        0.4296875,
        0.43359375,
        0.4375,
        0.44140625,
        0.4453125,
        0.44921875,
        0.453125,
        0.45703125,
        0.4609375,
        0.46484375,
        0.46875,
        0.47265625,
        0.4765625,
        0.48046875,
        0.484375,
        0.48828125,
        0.4921875,
        0.49609375,
        0.5,
        0.50390625,
        0.5078125,
        0.51171875,
        0.515625,
        0.51953125,
        0.5234375,
        0.52734375,
        0.53125,
        0.53515625,
        0.5390625,
        0.54296875,
        0.546875,
        0.55078125,
        0.5546875,
        0.55859375,
        0.5625,
        0.56640625,
        0.5703125,
        0.57421875,
        0.578125,
        0.58203125,
        0.5859375,
        0.58984375,
        0.59375,
        0.59765625,
        0.6015625,
        0.60546875,
        0.609375,
        0.61328125,
        0.6171875,
        0.62109375,
        0.625,
        0.62890625,
        0.6328125,
        0.63671875,
        0.640625,
        0.64453125,
        0.6484375,
        0.65234375,
        0.65625,
        0.66015625,
        0.6640625,
        0.66796875,
        0.671875,
        0.67578125,
        0.6796875,
        0.68359375,
        0.6875,
        0.69140625,
        0.6953125,
        0.69921875,
        0.703125,
        0.70703125,
        0.7109375,
        0.71484375,
        0.71875,
        0.72265625,
        0.7265625,
        0.73046875,
        0.734375,
        0.73828125,
        0.7421875,
        0.74609375,
        0.75,
        0.75390625,
        0.7578125,
        0.76171875,
        0.765625,
        0.76953125,
        0.7734375,
        0.77734375,
        0.78125,
        0.78515625,
        0.7890625,
        0.79296875,
        0.796875,
        0.80078125,
        0.8046875,
        0.80859375,
        0.8125,
        0.81640625,
        0.8203125,
        0.82421875,
        0.828125,
        0.83203125,
        0.8359375,
        0.83984375,
        0.84375,
        0.84765625,
        0.8515625,
        0.85546875,
        0.859375,
        0.86328125,
        0.8671875,
        0.87109375,
        0.875,
        0.87890625,
        0.8828125,
        0.88671875,
        0.890625,
        0.89453125,
        0.8984375,
        0.90234375,
        0.90625,
        0.91015625,
        0.9140625,
        0.91796875,
        0.921875,
        0.92578125,
        0.9296875,
        0.93359375,
        0.9375,
        0.94140625,
        0.9453125,
        0.94921875,
        0.953125,
        0.95703125,
        0.9609375,
        0.96484375,
        0.96875,
        0.97265625,
        0.9765625,
        0.98046875,
        0.984375,
        0.98828125,
        0.9921875,
        0.99609375,
        1,
    ]
}


/**
    Cool Warm color scale
*/
function getCoolWarmScale() {


    return [
        "rgb(59, 76, 192)",
        "rgb(60, 78, 194)",
        "rgb(61, 80, 195)",
        "rgb(62, 81, 197)",
        "rgb(63, 83, 198)",
        "rgb(64, 85, 200)",
        "rgb(66, 87, 201)",
        "rgb(67, 88, 203)",
        "rgb(68, 90, 204)",
        "rgb(69, 92, 206)",
        "rgb(70, 93, 207)",
        "rgb(71, 95, 209)",
        "rgb(73, 97, 210)",
        "rgb(74, 99, 211)",
        "rgb(75, 100, 213)",
        "rgb(76, 102, 214)",
        "rgb(77, 104, 215)",
        "rgb(79, 105, 217)",
        "rgb(80, 107, 218)",
        "rgb(81, 109, 219)",
        "rgb(82, 110, 221)",
        "rgb(84, 112, 222)",
        "rgb(85, 114, 223)",
        "rgb(86, 115, 224)",
        "rgb(87, 117, 225)",
        "rgb(89, 119, 226)",
        "rgb(90, 120, 228)",
        "rgb(91, 122, 229)",
        "rgb(93, 123, 230)",
        "rgb(94, 125, 231)",
        "rgb(95, 127, 232)",
        "rgb(96, 128, 233)",
        "rgb(98, 130, 234)",
        "rgb(99, 131, 235)",
        "rgb(100, 133, 236)",
        "rgb(102, 135, 237)",
        "rgb(103, 136, 238)",
        "rgb(104, 138, 239)",
        "rgb(106, 139, 239)",
        "rgb(107, 141, 240)",
        "rgb(108, 142, 241)",
        "rgb(110, 144, 242)",
        "rgb(111, 145, 243)",
        "rgb(112, 147, 243)",
        "rgb(114, 148, 244)",
        "rgb(115, 150, 245)",
        "rgb(116, 151, 246)",
        "rgb(118, 153, 246)",
        "rgb(119, 154, 247)",
        "rgb(120, 156, 247)",
        "rgb(122, 157, 248)",
        "rgb(123, 158, 249)",
        "rgb(124, 160, 249)",
        "rgb(126, 161, 250)",
        "rgb(127, 163, 250)",
        "rgb(129, 164, 251)",
        "rgb(130, 165, 251)",
        "rgb(131, 167, 252)",
        "rgb(133, 168, 252)",
        "rgb(134, 169, 252)",
        "rgb(135, 171, 253)",
        "rgb(137, 172, 253)",
        "rgb(138, 173, 253)",
        "rgb(140, 174, 254)",
        "rgb(141, 176, 254)",
        "rgb(142, 177, 254)",
        "rgb(144, 178, 254)",
        "rgb(145, 179, 254)",
        "rgb(147, 181, 255)",
        "rgb(148, 182, 255)",
        "rgb(149, 183, 255)",
        "rgb(151, 184, 255)",
        "rgb(152, 185, 255)",
        "rgb(153, 186, 255)",
        "rgb(155, 187, 255)",
        "rgb(156, 188, 255)",
        "rgb(158, 190, 255)",
        "rgb(159, 191, 255)",
        "rgb(160, 192, 255)",
        "rgb(162, 193, 255)",
        "rgb(163, 194, 255)",
        "rgb(164, 195, 254)",
        "rgb(166, 196, 254)",
        "rgb(167, 197, 254)",
        "rgb(168, 198, 254)",
        "rgb(170, 199, 253)",
        "rgb(171, 199, 253)",
        "rgb(172, 200, 253)",
        "rgb(174, 201, 253)",
        "rgb(175, 202, 252)",
        "rgb(176, 203, 252)",
        "rgb(178, 204, 251)",
        "rgb(179, 205, 251)",
        "rgb(180, 205, 251)",
        "rgb(182, 206, 250)",
        "rgb(183, 207, 250)",
        "rgb(184, 208, 249)",
        "rgb(185, 208, 248)",
        "rgb(187, 209, 248)",
        "rgb(188, 210, 247)",
        "rgb(189, 210, 247)",
        "rgb(190, 211, 246)",
        "rgb(192, 212, 245)",
        "rgb(193, 212, 245)",
        "rgb(194, 213, 244)",
        "rgb(195, 213, 243)",
        "rgb(197, 214, 243)",
        "rgb(198, 214, 242)",
        "rgb(199, 215, 241)",
        "rgb(200, 215, 240)",
        "rgb(201, 216, 239)",
        "rgb(203, 216, 238)",
        "rgb(204, 217, 238)",
        "rgb(205, 217, 237)",
        "rgb(206, 217, 236)",
        "rgb(207, 218, 235)",
        "rgb(208, 218, 234)",
        "rgb(209, 219, 233)",
        "rgb(210, 219, 232)",
        "rgb(211, 219, 231)",
        "rgb(213, 219, 230)",
        "rgb(214, 220, 229)",
        "rgb(215, 220, 228)",
        "rgb(216, 220, 227)",
        "rgb(217, 220, 225)",
        "rgb(218, 220, 224)",
        "rgb(219, 220, 223)",
        "rgb(220, 221, 222)",
        "rgb(221, 221, 221)",
        "rgb(222, 220, 219)",
        "rgb(223, 220, 218)",
        "rgb(224, 219, 216)",
        "rgb(225, 219, 215)",
        "rgb(226, 218, 214)",
        "rgb(227, 218, 212)",
        "rgb(228, 217, 211)",
        "rgb(229, 216, 209)",
        "rgb(230, 216, 208)",
        "rgb(231, 215, 206)",
        "rgb(232, 215, 205)",
        "rgb(232, 214, 203)",
        "rgb(233, 213, 202)",
        "rgb(234, 212, 200)",
        "rgb(235, 212, 199)",
        "rgb(236, 211, 197)",
        "rgb(236, 210, 196)",
        "rgb(237, 209, 194)",
        "rgb(238, 209, 193)",
        "rgb(238, 208, 191)",
        "rgb(239, 207, 190)",
        "rgb(240, 206, 188)",
        "rgb(240, 205, 187)",
        "rgb(241, 204, 185)",
        "rgb(241, 203, 184)",
        "rgb(242, 202, 182)",
        "rgb(242, 201, 181)",
        "rgb(243, 200, 179)",
        "rgb(243, 199, 178)",
        "rgb(244, 198, 176)",
        "rgb(244, 197, 174)",
        "rgb(245, 196, 173)",
        "rgb(245, 195, 171)",
        "rgb(245, 194, 170)",
        "rgb(245, 193, 168)",
        "rgb(246, 192, 167)",
        "rgb(246, 191, 165)",
        "rgb(246, 190, 163)",
        "rgb(246, 188, 162)",
        "rgb(247, 187, 160)",
        "rgb(247, 186, 159)",
        "rgb(247, 185, 157)",
        "rgb(247, 184, 156)",
        "rgb(247, 182, 154)",
        "rgb(247, 181, 152)",
        "rgb(247, 180, 151)",
        "rgb(247, 178, 149)",
        "rgb(247, 177, 148)",
        "rgb(247, 176, 146)",
        "rgb(247, 174, 145)",
        "rgb(247, 173, 143)",
        "rgb(247, 172, 141)",
        "rgb(247, 170, 140)",
        "rgb(247, 169, 138)",
        "rgb(247, 167, 137)",
        "rgb(247, 166, 135)",
        "rgb(246, 164, 134)",
        "rgb(246, 163, 132)",
        "rgb(246, 161, 131)",
        "rgb(246, 160, 129)",
        "rgb(245, 158, 127)",
        "rgb(245, 157, 126)",
        "rgb(245, 155, 124)",
        "rgb(244, 154, 123)",
        "rgb(244, 152, 121)",
        "rgb(244, 151, 120)",
        "rgb(243, 149, 118)",
        "rgb(243, 147, 117)",
        "rgb(242, 146, 115)",
        "rgb(242, 144, 114)",
        "rgb(241, 142, 112)",
        "rgb(241, 141, 111)",
        "rgb(240, 139, 109)",
        "rgb(240, 137, 108)",
        "rgb(239, 136, 106)",
        "rgb(238, 134, 105)",
        "rgb(238, 132, 103)",
        "rgb(237, 130, 102)",
        "rgb(236, 129, 100)",
        "rgb(236, 127, 99)",
        "rgb(235, 125, 97)",
        "rgb(234, 123, 96)",
        "rgb(233, 121, 95)",
        "rgb(233, 120, 93)",
        "rgb(232, 118, 92)",
        "rgb(231, 116, 90)",
        "rgb(230, 114, 89)",
        "rgb(229, 112, 88)",
        "rgb(228, 110, 86)",
        "rgb(227, 108, 85)",
        "rgb(227, 106, 83)",
        "rgb(226, 104, 82)",
        "rgb(225, 102, 81)",
        "rgb(224, 100, 79)",
        "rgb(223, 98, 78)",
        "rgb(222, 96, 77)",
        "rgb(221, 94, 75)",
        "rgb(220, 92, 74)",
        "rgb(218, 90, 73)",
        "rgb(217, 88, 71)",
        "rgb(216, 86, 70)",
        "rgb(215, 84, 69)",
        "rgb(214, 82, 67)",
        "rgb(213, 80, 66)",
        "rgb(212, 78, 65)",
        "rgb(210, 75, 64)",
        "rgb(209, 73, 62)",
        "rgb(208, 71, 61)",
        "rgb(207, 69, 60)",
        "rgb(205, 66, 59)",
        "rgb(204, 64, 57)",
        "rgb(203, 62, 56)",
        "rgb(202, 59, 55)",
        "rgb(200, 57, 54)",
        "rgb(199, 54, 53)",
        "rgb(198, 51, 52)",
        "rgb(196, 49, 50)",
        "rgb(195, 46, 49)",
        "rgb(193, 43, 48)",
        "rgb(192, 40, 47)",
        "rgb(190, 37, 46)",
        "rgb(189, 34, 45)",
        "rgb(188, 30, 44)",
        "rgb(186, 26, 43)",
        "rgb(185, 22, 41)",
        "rgb(183, 17, 40)",
        "rgb(181, 11, 39)",
        "rgb(180, 4, 38)",
    ]
}