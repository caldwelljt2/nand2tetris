// const progData = ['@R14', 'AM=D-1', 'D=M', '@THAT', 'M=D', '@R14',
//     'AM=M-1', 'D=M', '@THIS', 'M=D', '@R14', 'AM=M-1',
//     'D=M', '@ARG', 'M=D', '@R14', 'AM=M-1', 'D=M',
//     '@LCL', 'M=D', '@R13', 'A=M', '0;JMP', '@SP',
//     'A=M', 'M=D', '@LCL', 'D=M', '@iggy.0', 'D=M',
//     '@R1', 'D;JTE']

let symbolsStart = 16
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


let symbolsArray = [
    ['SCREEN', "16384"],
    ['KBD', "24576"],
    ['SP', "0"],
    ['LCL', "1"],
    ['ARG', "2"],
    ['THIS', "3"],
    ['THAT', "4"],
    ['R0', "0"],
    ['R1', "1"],
    ['R2', "2"],
    ['R3', "3"],
    ['R4', "4"],
    ['R5', "5"],
    ['R6', "6"],
    ['R7', "7"],
    ['R8', "8"],
    ['R9', "9"],
    ['R10', "10"],
    ['R11', "11"],
    ['R12', "12"],
    ['R13', "13"],
    ['R14', "14"],
    ['R15', "15"],
]

const getAddSymbol = (symbol) => {
    let foundItem = []
    foundItem = symbolsArray.find((item) => {
        // console.log(item[0], symbol)
        return item[0] == symbol
    })
    console.log(foundItem)
    // console.log(foundItem, 'function here')
    if (foundItem) {
        console.log('found an entry')
        return foundItem[1]
    } else {
        console.log('making a new entry')
        symbolsArray.push([symbol, symbolsStart++])
        return symbolsArray.slice(-1)[0][1]
    }
}
const getDestination = (destinationName) => {
    let destinationArray = [
        [null, "000"],
        ['M', "001"],
        ['D', "010"],
        ['MD', "011"],
        ['DM', "011"],
        ['A', "100"],
        ['AM', "101"],
        ['MA', "101"],
        ['AD', "110"],
        ['DA', "110"],
        ['AMD', "111"],
        ['ADM', "111"],
        ['MDA', "111"],
        ['MAD', "111"],
        ['DAM', "111"],
        ['DMA', "111"],
    ]
    let foundItem = []
    foundItem = destinationArray.find((item) => {
        // console.log(item[0], destinationName)
        return item[0] == destinationName
    })
    // console.log(foundItem, 'function here')
    if (foundItem) {
        // console.log('found an entry')
        return foundItem[1]
    } else {
        return 'invalid destination'
    }
}
const getCommand = (commandName) => {
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

    let foundItem = []
    foundItem = commandArray.find((item) => {
        // console.log(item[0], commandName)
        return item[0] == commandName
    })
    // console.log(foundItem, 'function here')
    if (foundItem) {
        // console.log('found an entry')
        return foundItem[1]
    } else {
        return 'invalid command'
    }
}
const getJump = (jumpName) => {
    let jumpArray = [
        [null, "000"],
        ['JGT', "001"],
        ['JEQ', "010"],
        ['JGE', "011"],
        ['JLT', "100"],
        ['JNE', "101"],
        ['JLE', "110"],
        ['JMP', "111"],
    ]
    let foundItem = []
    foundItem = jumpArray.find((item) => {
        return item[0] == jumpName
    })
    if (foundItem) {
        return foundItem[1]
    } else {
        return 'invalid jump'
    }
}

const makeBinary = (commandLine) => {
    const commandObject = {}
    // commandObject.original = commandLine
    if (commandLine.includes('(')) { commandObject.type = 'L' }
    if (commandLine.includes('@')) { commandObject.type = 'A' }
    if (commandLine.includes('=')) { commandObject.type = 'C' }
    if (commandLine.includes(';')) { commandObject.type = 'J' }

    if (commandObject.type == "A") {
        address = commandLine.split("@")[1]
        // test if only number
        if (address * 1 == address) {
            commandObject.address = address * 1
        } else {
            commandObject.address = getAddSymbol(address)
        }
        commandObject.binaryOutput = "0" + (commandObject.address * 1).toString(2).padStart(15, '0')
    }

    if (commandObject.type == "C") {
        destination = commandLine.split("=")[0]
        command = commandLine.split("=")[1]
        destinationAsBinary = getDestination(destination)
        commandAsBinary = getCommand(command)
        jumpAsBinary = "000"
        commandObject.binaryOutput = "111" + commandAsBinary + destinationAsBinary + jumpAsBinary
    }

    if (commandObject.type == "J") {
        command = commandLine.split(";")[0]
        jump = commandLine.split(";")[1]

        commandAsBinary = getCommand(command)
        jumpAsBinary = getJump(jump)
        destinationAsBinary = "000"

        commandObject.binaryOutput = "111" + commandAsBinary + destinationAsBinary + jumpAsBinary

    }

    // commandObject.front = commandLine.split("=")[0] + ""
    // middleEnd = commandLine.split("=")[1] + ""
    // commandObject.middleaddress = middleEnd.split(";")[0] + ""
    // commandObject.end = middleEnd.split(";")[1] + ""
    // commandObject.original = commandLine.split(";")[1] + ""

    return commandObject.binaryOutput
}
// console.log(
//     // makeBinary('@44'),
//     // makeBinary('@R1'),
//     // makeBinary('@i'),
//     // makeBinary('@g'),
//     // makeBinary('@i'),
//     makeBinary('D=M'),
//     // makeBinary('D=D-M;JMP'),
//     makeBinary('D;JLT'),
// )

// console.log(

//     symbolsArray.find((symbol) => {
//         return  ('SCREEN' == symbol[0])
//     })
// )

module.exports = { makeBinary, symbolsArray }