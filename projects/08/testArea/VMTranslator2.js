
const {
    makeArray,
    removeComments,
    cleanArray,
    makeComObj,
    makeAsmCommand,
    extractFilename,
    extractFilePath
} = require('./v2mFunc2')

// let {uniqueName} = require('./v2mFunc')

const fs = require('fs')
const path = require("path");
const { resolve } = require('path');


// make Promise version of fs.readdir()
fs.readdirAsync = function(dirname) {
    return new Promise(function(resolve, reject) {
        fs.readdir(dirname, function(err, filenames){
            if (err) 
                reject(err); 
            else 
                resolve(filenames);
        });
    });
};

// utility function, return Promise
const getDir = (dirName) => {
    return fs.readdirAsync(dirName);
}

// make Promise version of fs.readFile()
fs.readFileAsync = function(filename, enc) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, enc, function(err, data){
            if (err) 
                reject(err); 
            else
                resolve(data);
        });
    });
};

// utility function, return Promise
const getFile = (filename) => {
    return fs.readFileAsync(filename, 'utf8');
}

// for use with array (.filter) to return only VM files
const isVMFile = (filename) => {
  return (filename.split('.')[1] == 'vm')
}

const createObjsFromCommands = ((content, uniqueName) => {
    let vmCode = content
    // console.log(vmCode)
    const vmCodeNoCom = removeComments(vmCode)
    const codeArray = makeArray(vmCodeNoCom)
    const usableArray = cleanArray(codeArray)
    const codeWithObj = makeComObj(usableArray, uniqueName)
    // console.log(codeWithObj)
    return codeWithObj
})

const writeAsmFromCodeObj = ((codeWithObj, fileNameOutput) => {
    let bootStrap = '// bootstrap\r\n@256\r\nD=A\r\n@SP\r\nM=D\r\n'
    let endLoop = '// end Loop\r\n(ENDLOOP)\r\n@ENDLOOP\r\n0;JMP\r\n'
    
    const outArray = codeWithObj.map((line) => {
        // console.log(line)
        return makeAsmCommand(line).join('\r\n') // make command as an array then join them here for simplicity
    })

    outArray.unshift(bootStrap) 
    outArray.push(endLoop) // quick and dirty final loop to keep machine in place

    const finalOutputAsString = outArray.join('\r\n');  // join the overall program into one long

    // fs.writeFile(fileOutputDirectory + fileNameOutput, finalOutputAsString, (err) => {
        
    fs.writeFile(fileNameOutput, finalOutputAsString, (err) => {
        if (err) {
            throw err;
        }
    });
        // console.log(finalOutputAsString)
        console.log("Data has been written to file successfully to " + fileNameOutput);
    // return finalOutputAsString
})

let isFile = (pathItem) => {
    return !!path.extname(pathItem);
  }


if (process.argv.length < 2) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME.asm '); // removed custom asm naming for testing to work
    process.exit(1)
}

const fileNameInput = process.argv[2] // input file
const fileOrDirName = extractFilename(fileNameInput)

if (isFile(fileOrDirName)) { 
    let fileName = fileOrDirName
    let absolutName = resolve(fileOrDirName)
    console.log(`your file is: ${fileOrDirName} and absolute name is ${absolutName}`)
    
    
    
    
    
    
    
} else {
    let dirName = resolve(fileNameInput).split('\\').pop()
    let absolutName = resolve(fileOrDirName)
    let fileNameOutput = absolutName + "/" + dirName + ".asm"
    console.log('argv stuff is',process.argv[0],process.argv[1],process.argv[2],process.argv[3])

    console.log(`Your DIRECTORY is: ${dirName} and absolute name is ${absolutName}`)



    getDir(absolutName).then((fileArray) => {
        let vmFileArray = fileArray.filter(isVMFile)

        // move sys first if exists
        const sysIndex = vmFileArray.indexOf('Sys.vm');
        if (sysIndex > -1) {
            let sysItem = vmFileArray.splice(sysIndex, 1); // 2nd parameter means remove one item only
            vmFileArray.unshift(...sysItem)
        }
        
        const  contentAll = []
        vmFileArray.forEach((filename) => {
            getFile(filename)
            .then((contents) => {
                // console.log(contents)
                // console.log(contentAll)
                let newArray = createObjsFromCommands(contents, filename)
                contentAll.push( ...newArray)
                // console.log(contentAll)
                return contentAll
            })
            .then((arrayContent) => writeAsmFromCodeObj(arrayContent, fileNameOutput))
        })
    })





}
// console.log(fileOrDirName, isFile(fileOrDirName))


// console.log(resolve(fileNameInput).split('\\').pop(), resolve(fileNameInput)) // directory name


// console.log(fileNameInput.split('').pop()) // file name or directory test

// console.log(isFile('/'))



// const fileName = extractFilename(fileNameInput)
// const fileOutputDirectory = extractFilePath(fileNameInput)

// let fileNameOutput = fileName.split('.')[0] + '.asm'
// let uniqueName = fileName.split('.')[0]
// console.log('my unqName' + uniqueName)
// console.log('fileNameInput: ' + fileNameInput + " or just name: " + fileName)
// console.log('output file: ' + fileOutputDirectory + fileNameOutput)




// const directoryName = path.basename(__dirname);
// console.log(directoryName); // test



// getDir('./').then((fileArray) => {
//     let vmFileArray = fileArray.filter(isVMFile)
//     let contentAll = ''
//     vmFileArray.forEach((filename) => {
//         getFile(filename)
//         .then((contents) => {
//             // console.log(contents)
//             contentAll = contentAll + contents
//             return contentAll
//         })
//         // .then((arrayContent) => createObjsFromCommands(arrayContent, fileNameOutput))
//     })
// })








// fs.readFile(fileNameInput, 'utf8', function (err, vmCode) {
//     const vmCodeNoCom = removeComments(vmCode)
//     const codeArray = makeArray(vmCodeNoCom)
//     const usableArray = cleanArray(codeArray)
//     const codeWithObj = makeComObj(usableArray, uniqueName)
//     // console.log(codeWithObj)
//     const outArray = codeWithObj.map((line) => {
//         // console.log(line)
//         return makeAsmCommand(line).join('\r\n') // make command as an array then join them here for simplicity
//     })

//     outArray.push('(ENDLOOP)\r\n@ENDLOOP\r\n0;JMP\r\n') // quick and dirty final loop to keep machine in place

//     const finalOutputAsString = outArray.join('\r\n');  // join the overall program into one long

//     fs.writeFile(fileOutputDirectory+fileNameOutput, finalOutputAsString, (err) => {
//         if (err) {
//             throw err;
//         }
//         console.log("Data has been written to file successfully.");
//     });

//     // console.log(finalOutputAsString) //  Check output
//     // console.log(usableArray)
// })


