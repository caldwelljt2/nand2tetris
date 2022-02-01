
const {
    makeArray,
    removeComments,
    cleanArray,
    makeComObj,
    makeAsmCommand,
    extractFilename,
    extractFilePath
} = require('./v2mFunc')

const fs = require('fs')

if (process.argv.length < 2) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME.asm '); // removed custom asm naming for testing to work
    process.exit(1)
}

const fileNameInput = process.argv[2] // input file
const fileName = extractFilename(fileNameInput)
const fileOutputDirectory = extractFilePath(fileNameInput)

let fileNameOutput = fileName.split('.')[0] + '.asm'

console.log('fileNameInput: ' + fileNameInput + " or just name: " + fileName)
console.log('output file: ' + fileOutputDirectory + fileNameOutput)

fs.readFile(fileNameInput, 'utf8', function (err, vmCode) {
    const vmCodeNoCom = removeComments(vmCode)
    const codeArray = makeArray(vmCodeNoCom)
    const usableArray = cleanArray(codeArray)
    const codeWithObj = makeComObj(usableArray)

    const outArray = codeWithObj.map((line) => {
        return makeAsmCommand(line).join('\r\n') // make command as an array then join them here for simplicity
    })

    outArray.push('(ENDLOOP)\r\n@ENDLOOP\r\n0;JMP\r\n') // quick and dirty final loop to keep machine in place

    const finalOutputAsString = outArray.join('\r\n');  // join the overall program into one long

    fs.writeFile(fileOutputDirectory+fileNameOutput, finalOutputAsString, (err) => {
        if (err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });

    // console.log(finalOutputAsString) //  Check output
    // console.log(usableArray)
})