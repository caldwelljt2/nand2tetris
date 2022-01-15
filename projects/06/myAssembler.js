// setup some search criteria

let comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
let whitespace = /\s/g

// this array will be modified and must be run fresh or reset if processng more than one
let symbolsArray = [   
    ['R0', 0],
    ['R1', 1],
    ['R2', 2],
    ['R3', 3],
    ['R4', 4],
    ['R5', 5],
    ['R6', 6],
    ['R7', 7],
    ['R8', 8],
    ['R9', 9],
    ['R10', 10],
    ['R11', 11],
    ['R12', 12],
    ['R13', 13],
    ['R14', 14],
    ['R15', 15],
    ['SCREEN', 16384],
    ['KBD', 24576],
    ['SP',0],
    ['LCL',1],
    ['ARG',2],
    ['THIS',3],
    ['THAT',4],
]

let commandArray = [   // replace after =
    ['0',0101010],
    ['1',0111111],
    ['-1',0111010],
    ['D',0001100],
    ['A',0110000],
    ['!D',0001101],
    ['!A',0110001],
    ['-D',0001111],
    ['-A',0110011],
    ['D+1',0011111],
    ['A+1',0110111],
    ['D-1',0001110],
    ['A-1',0110010],
    ['D+A',0000010],
    ['D-A',0010011],
    ['A-D',0000111],
    ['D&A',0000000],
    ['D|A',0010101],
    ['M',1110000],
    ['!M',1110001],
    ['M+1',1110111],
    ['M-1',1110010],
    ['D+M',1000010],
    ['D-M',1010011],
    ['D&M',1000000],
    ['D|M',1010101],
]

let destinationArray = [
    [null,000],
    ['M',001],
    ['D',010],
    ['MD',011],
    ['A',100],
    ['AM',101],
    ['AD',110],
    ['AMD',111],
]

let jumpArray = [
    [null,000],
    ['JGT',001],
    ['JEQ',010],
    ['JGE',011],
    ['JLT',100],
    ['JNE',101],
    ['JLE',110],
    ['JMP',111],
]



// rework to pull from external file
let myProg = `@R0
D=M              // D = first number
@R1
D=D-M            // D = first number - second number
@OUTPUT_FIRST
D;JGT            // if D>0 (first is greater) goto output_first
@R1
D=M              // D = second number
@OUTPUT_D
0;JMP            // goto output_d
(OUTPUT_FIRST)
@R0             
D=M              // D = first number
(OUTPUT_D)
@R2
M=D              // M[2] = D (greatest number)
(INFINITE_LOOP)
@INFINITE_LOOP
0;JMP            // infinite loop`

let myArray = myProg.replace(comments, '').split("\n")

const cleanArray = myArray.map((item) => {
    return item.replace(whitespace, '')
})

let openParenth = /\(/g
let closedParenth = /\)/g
// const deloopedArray = cleanArray.map((item) => {
//     if ( openParenth.test(item) ) {
//         console.log ('found one')

//     } else {
//         return item
//     }

// })
// cleanArray.reduce(item, (symbolsArray, item) => {
//     if (openParenth.test(item)) {
//         console.log('found one')
//     } symbolsArray.push(item)
// }, 0)

cleanArray.forEach((item, index) => {
    if (openParenth.test(item)) {
        symbolsArray.push([item.replace(openParenth, '').replace(closedParenth, ''), index])
        cleanArray.splice(index, 1);
    }
    // console.log(item)
})
console.log(symbolsArray)
// console.log(cleanArray.some(r => symbolsArray.indexOf(r)))
console.log(cleanArray)
console.log(cleanArray.indexOf('@R1'))
let betterArray = cleanArray.map((item) => {

    symbolsArray.forEach((symbol) => {
        if (item == '@' + symbol[0]) {
            // console.log('wooot!')
            item = '@' + symbol[1]
        }
    }
    )
    return item
    //     else {
    //        return item
    //    }
})

console.log(betterArray)
// console.log("moo       moo".replace( /\s*/g,""))


