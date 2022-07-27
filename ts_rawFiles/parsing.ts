
/**
Receives a filepath to a CSV file and the inputConfig as input.
Converts the content of the CSV file with d3 parsing to a java object.
Returns an arry with the data, or an error if data not foun
*/
async function parseFromDataPathAsync(filePath: string) {
    // use fetch for file-reading
    let response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Could not fetch ${filePath}: ${response.status} - ${response.statusText}`);
    }
    let cvsText = await response.text();
    return parseFromCSVString(cvsText); 
  }


/**
Recieves a csvString 
Converts the input to a Java object with d3 parsing.
saves numbers as numbers, not STrings
*/
function parseFromCSVString(csvString: string): InputData {
    return d3.csvParse(csvString, (d: any) => {
        let numTest: any;
        // tests each object for numbers
        for (let attr in d) {
            numTest = d[attr];
            numTest = +numTest;
            if (!isNaN(numTest)) {
                d[attr] = numTest;
            }
        }
        return d;
    })
}