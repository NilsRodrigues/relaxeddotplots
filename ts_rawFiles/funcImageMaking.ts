
// helper for easy switch
let imageKeyword = "Faces";
// set the actual image list here
let imageList: ImageList = getImageList();


// getter for easy selecting of new datasets
function getImageList(): ImageList{
    
    switch (imageKeyword) {
        case "Faces":
            return getFaceImages();
        default:
            throw new Error("Keyword " + imageKeyword + " does not have an ImageList tied to it");
    }
}

/* 
    get URL of image at given Index in the imageList
*/
function getImageURL(imageIndex: string): string{
    // local server location
    let urlStart: string = `http://127.0.0.1:8080/examples/${imageKeyword}/`;


    return urlStart + imageList[imageIndex].fileName;
}

// help function to make a getImage function string
function createGetImages(){
    let text = "return {\n";
    for (let index = 0; index < 20; index++) {
        text += "\t," + index + ": {\n"
        text += "\t\tfileName: \"AvatarMaker" + index + "\"\n"
        text += "\t\t,order: 1\n"
        text += "\t}\n"
    }
    text = "}";
    console.log(text);
}


/** Helper functions to make adding new datasets easyer and not flood the Image getter too much */

function getFaceImages(): ImageList {
    return {
        0: {
            fileName: "AvatarMaker0.png"
            ,order: 1
        }	
        ,1: {
            fileName: "AvatarMaker1.png"
            ,order: 1
        }	
        ,2: {
            fileName: "AvatarMaker2.png"
            ,order: 1
        }	
        ,3: {
            fileName: "AvatarMaker3.png"
            ,order: 1
        }	
        ,4: {
            fileName: "AvatarMaker4.png"
            ,order: 1
        }	
        ,5: {
            fileName: "AvatarMaker5.png"
            ,order: 1
        }	
        ,6: {
            fileName: "AvatarMaker6.png"
            ,order: 1
        }	
        ,7: {
            fileName: "AvatarMaker7.png"
            ,order: 1
        }	
        ,8: {
            fileName: "AvatarMaker8.png"
            ,order: 1
        }	
        ,9: {
            fileName: "AvatarMaker9.png"
            ,order: 1
        }	
        ,10: {
            fileName: "AvatarMaker10.png"
            ,order: 1
        }	
        ,11: {
            fileName: "AvatarMaker11.png"
            ,order: 1
        }	
        ,12: {
            fileName: "AvatarMaker12.png"
            ,order: 1
        }	
        ,13: {
            fileName: "AvatarMaker13.png"
            ,order: 1
        }	
        ,14: {
            fileName: "AvatarMaker14.png"
            ,order: 1
        }	
        ,15: {
            fileName: "AvatarMaker15.png"
            ,order: 1
        }	
        ,16: {
            fileName: "AvatarMaker16.png"
            ,order: 1
        }	
        ,17: {
            fileName: "AvatarMaker17.png"
            ,order: 1
        }	
        ,18: {
            fileName: "AvatarMaker18.png"
            ,order: 1
        }	
        ,19: {
            fileName: "AvatarMaker19.png"
            ,order: 1
        }
    }
}
