/**
Download @param text as a file with the name @param filename
*/
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}


/** returns the euclidean deistance between two circles*/
function euclidDist(c1: Circle, c2: Circle) {
    return Math.sqrt((c1.xPix - c2.xPix) * (c1.xPix - c2.xPix) + (c1.yPix - c2.yPix) * (c1.yPix - c2.yPix))
}

/** creates a .txt file that can be read by the original Jacobian-creation programm */
function _exportLayoutToTxt(inputConfig: InputConfig, circleData: CircleData, plotParam: PlotParam) {
    let content: string = "";
    let biggerSide = (plotParam.width > plotParam.height) ? plotParam.width : plotParam.height;
    let firstRun: boolean = true;

    circleData.forEach((circle) => {
        // every line is: `radius x-pos y-pos`
        // positions are divided by width or height (bigger one) to map numbers between [0,1] but also keep the aspectratio
        if (firstRun) {
            content += `${circle.radiusPix * (1 - inputConfig.dots.circlePadding) / biggerSide} ${circle.xPix / biggerSide} ${circle.yPix / biggerSide}`
            firstRun = false;
        } else {
            content += `\n${circle.radiusPix * (1 - inputConfig.dots.circlePadding) / biggerSide} ${circle.xPix / biggerSide} ${circle.yPix / biggerSide}`
        }
    })

    // saving the content as file
    let blob = new Blob([content],
        { type: "text/plain;charset=utf-16" });
    saveAs(blob, "blueNoiseInput.txt");
}
