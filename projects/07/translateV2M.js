// filename = './MemoryAccess/StaticTest/StaticTest.vm'
// // filename = './MemoryAccess/StaticTest/myTest.vm'
// filename = './StackArithmetic/StackTest/StackTest.vm'
// let filenameOutput = './garbageTest.asm'









const {
    makeArray,
    removeComments,
    cleanArray,
    makeComObj,
    makeAsmCommand,
    // symbolsArray,  // starting array, intention is to mutate it as we go
    // openParenth, // left over from initial regex approach but still used
    // closedParenth, // same as above
    // comments, // regex expression to identify all comments for removal
    // whitespace, // could be added with above, but left for simplicity, identifys any leftover whitespace for removal
    // makeBinary // main function for constructing a binary A or C instruction (assumes there are no loops present, variables are OK)
} = require('./v2mFunc')

const fs = require('fs');

if (process.argv.length < 2) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME.asm '); // FILENAME.hack (optional)
    process.exit(1);
}
// } else if (process.argv.length < 2) {
    let filename = process.argv[2] // input file
    let filenameOutput = filename.split('.')[0] + '.asm'
// } else {
//     let filename = process.argv[2] // input file
//     let filenameOutput = process.argv[3] // output file

console.log('your input filename: ' + filename + ' output : ' + filenameOutput)
fs.readFile(filename, 'utf8', function (err, vmCode) {
    // const outArray = []
    const vmCodeNoCom = removeComments(vmCode)
    const codeArray = makeArray(vmCodeNoCom)
    const usableArray = cleanArray(codeArray)
    // step 1 - parse all lines into an array
    const codeWithObj = makeComObj(usableArray)

    const outArray = codeWithObj.map((line) => {
        return makeAsmCommand(line).join('\r\n') // make command as an array then join them here for simplicity
    })

    outArray.push('(ENDLOOP)\r\n@ENDLOOP\r\n0;JMP\r\n') // quick and dirty final loop to keep machine in place

    const finalOutputAsString = outArray.join('\r\n');  // join the overall program into one long

    fs.writeFile(filenameOutput, finalOutputAsString, (err) => {
        if (err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });

    // console.log(finalOutputAsString) //  Check output
    // console.log(usableArray)
})



// step 2 - break line into object or array


// create a function for each line type
// push, pop (move mem on/off stack)
// add = x + y
// sub = x - y
// neg = -y <---------- diff? moves up only 1 vs 2 in stack?
// eq  = x==y (returns 0/1)
// gt  = x>y
// lt  = x<y (returns 0/1 or true/false)
// and = x AND y (binary hash)
// or  = x OR y (binary hash?)
// not = NOT y (binary hash?)

// establish stack, pointer, etc
// 0-15 | RAM0-RAM15 | R0-R15
//

// acceptable outputs
// @SP
// D=M (and like)
// R13-R15 - variables
// @256 - start of Stack - provided by reading in SP

// example
// push constant 4444




// setup SP for Stack
// @256
// D=A
// @SP
// M=D

// // push constant 4444
// // get a constant
// @4444
// D=A

// // fetch SP address
// @SP
// A=M // goes to address

// // sets value at that address to D register's value
// M=D

// //increment pointer
// @SP