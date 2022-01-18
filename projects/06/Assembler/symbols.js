// setup some search criteria

let openParenth = /\(/g
let closedParenth = /\)/g
let comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
let whitespace = /\s/g

// this array will be modified and must be run fresh or reset if processng more than one
variableIndex = 16 // this is where additional variables will start 
// let symbolsArray = [
//     ['SCREEN', "16384"],
//     ['KBD', "24576"],
//     ['SP', "0"],
//     ['LCL', "1"],
//     ['ARG', "2"],
//     ['THIS', "3"],
//     ['THAT', "4"],
//     ['R0', "0"],
//     ['R1', "1"],
//     ['R2', "2"],
//     ['R3', "3"],
//     ['R4', "4"],
//     ['R5', "5"],
//     ['R6', "6"],
//     ['R7', "7"],
//     ['R8', "8"],
//     ['R9', "9"],
//     ['R10', "10"],
//     ['R11', "11"],
//     ['R12', "12"],
//     ['R13', "13"],
//     ['R14', "14"],
//     ['R15', "15"],
// ]


let destinationArray = [
    [null, "000"],
    ['M=', "001"],
    ['D=', "010"],
    ['MD=', "011"],
    ['DM=', "011"],
    ['A=', "100"],
    ['AM=', "101"],
    ['MA=', "101"],
    ['AD=', "110"],
    ['DA=', "110"],
    ['AMD=', "111"],
    ['ADM=', "111"],
    ['MDA=', "111"],
    ['MAD=', "111"],
    ['DAM=', "111"],
    ['DMA=', "111"],
]

let commandArray = [   // replace after =
    ['0', "0101010"],
    ['1', "0111111"],
    ['-1', "0111010"],
    ['D', "0001100"],
    ['A', "0110000"],
    ['!D', "0001101"],
    ['!A', "0110001"],
    ['-D', "0001111"],
    ['-A', "0110011"],
    ['D+1', "0011111"],
    ['A+1', "0110111"],
    ['D-1', "0001110"],
    ['A-1', "0110010"],
    ['D+A', "0000010"],
    ['D-A', "0010011"],
    ['A-D', "0000111"],
    ['D&A', "0000000"],
    ['A&D', "0000000"],
    ['D|A', "0010101"],
    ['M', "1110000"],
    ['!M', "1110001"],
    ['M+1', "1110111"],
    ['M-1', "1110010"],
    ['D+M', "1000010"],
    ['M+D', "1000010"],
    ['D-M', "1010011"],
    ['M-D', "1000111"],
    ['D&M', "1000000"],
    ['M&D', "1000000"],
    ['D|M', "1010101"],
]


let jumpArray = [
    [null, "000"],
    [';JGT', "001"],
    [';JEQ', "010"],
    [';JGE', "011"],
    [';JLT', "100"],
    [';JNE', "101"],
    [';JLE', "110"],
    [';JMP', "111"],
]

module.exports = {
    openParenth,
    closedParenth,
    comments,
    // symbolsArray,
    destinationArray,
    commandArray,
    jumpArray,
    whitespace,
    }
