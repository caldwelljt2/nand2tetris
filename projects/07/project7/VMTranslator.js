// fileName = './MemoryAccess/StaticTest/StaticTest.vm'
// // fileName = './MemoryAccess/StaticTest/myTest.vm'
// fileName = './StackArithmetic/StackTest/StackTest.vm'
// let fileNameOutput = './garbageTest.asm'


const extractFilename = (path) => {
    const pathArray = path.split("/");
    const lastIndex = pathArray.length - 1;
    return pathArray[lastIndex];
};

const extractFilePath = (path) => {
    const pathArray = path.split("/");
    const lastIndex = pathArray.length - 1;
    pathArray.pop(lastIndex)
    pathArray.push('')
    return pathArray.join('/');
};




const {
    makeArray,
    removeComments,
    cleanArray,
    makeComObj,
    makeAsmCommand,
} = require('./v2mFunc')

const fs = require('fs')

if (process.argv.length < 2) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME.asm '); // FILENAME.hack (optional)
    process.exit(1)
}

const filePath = process.argv[2] // input file
const fileName = extractFilename(filePath)
const fileOutputDirectory = extractFilePath(filePath)

let fileNameOutput = fileName.split('.')[0] + '.asm'
// console.log('removing' + fileOutputDirectory)

console.log('filePath: ' + filePath)
console.log('your input fileName: ' + fileName + ' output : ' + fileOutputDirectory+fileNameOutput)

fs.readFile(filePath, 'utf8', function (err, vmCode) {
    // const outArray = []
    const vmCodeNoCom = removeComments(vmCode)
    const codeArray = makeArray(vmCodeNoCom)
    const usableArray = cleanArray(codeArray)
    // step 1 - parse all lines into an array
    const codeWithObj = makeComObj(usableArray)

    const outArray = codeWithObj.map((line) => {
        return makeAsmCommand(line).join('\r\n') // make command as an array then join them here for simplicity
    })

    // outArray.push('(ENDLOOP)\r\n@ENDLOOP\r\n0;JMP\r\n') // quick and dirty final loop to keep machine in place

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