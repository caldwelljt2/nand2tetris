// ### Temp Test Area, should be safe to ignore

// let testObj = { command: 'push', location: 'constant', arg: '888' }
// let testObj2 = { command: 'sub' }

// ### Start of function exports 
let uniqindx = 0  // used to create unique symbol names in ASM files, dirty but works, leave global to avoid overlapping
let uniqueId = ''

// setup some regex variables
const openParenth = /\(/g
const closedParenth = /\)/g
const comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
const whitespace = /\s/g


// ### Functions for creating clean arrays to work with
const removeComments = (string) => {
    return string.replace(comments, '')
}

const makeArray = (string) => {
    // to accept files with any variation of /r /n, /r/n, etc
    const justOneKind = string.replace(/(\r\n|\n\r|\n|\r)/gm, "\n")
    const array = justOneKind.split("\n")
    return array
}

const cleanArray = (array) => {
    // const deWhiteSpacedArray = array.map((item) => {
    //     return item.replace(whitespace, '')
    // })
    const cleanArray = array.filter(v => v)
    return cleanArray
}


// ### Make objects out of VM commands

const makeComObj = (array, uniqueName) => {
    const arrayWithObj = array.map((line) => {
        let lineAsArray = line.split(" ")
        let obj = {}
        obj.command = lineAsArray[0]
        obj.location = lineAsArray[1]
        obj.arg = lineAsArray[2]
        obj.uniqueName = uniqueName
        return obj
    })
    return arrayWithObj
}

// ### Functions for creating valid assembly commands based on VM language input
const makeAsmCommand = (obj) => {

    let secondMove = '-1' // set to -1 to appened -1 to A to move up 2 spots before returning (default)
    switch (obj.command) {
        case 'pop':
            return makeAsmCommandPop(obj)
            break;
        case 'push':
            return makeAsmCommandPush(obj)
            break;
        case 'sub':
            logic = 'M-D'
            return makeAsmCommandBasicLogic(obj, logic, secondMove)
            break;
        case 'add':
            logic = 'M+D'
            return makeAsmCommandBasicLogic(obj, logic, secondMove)
            break;
        case 'and':
            logic = 'D&M'
            return makeAsmCommandBasicLogic(obj, logic, secondMove)
            break;
        case 'or':
            logic = 'D|M'
            return makeAsmCommandBasicLogic(obj, logic, secondMove)
            break;
        case 'neg':
            logic = '-D'
            secondMove = '' // set to blank to remove from command stream and only consume 1 row
            return makeAsmCommandBasicLogic(obj, logic, secondMove)
        case 'not':
            logic = '!D'
            secondMove = '' // set to blank to remove from command stream and only consume 1 row
            return makeAsmCommandBasicLogic(obj, logic, secondMove)
            break;
        case 'gt':
        case 'lt':
        case 'eq':
            return makeAsmCommandCompare(obj)
            break;
        default:
            return ['NOT IMPLEMENTED']
    }

}

const makeAsmCommandPush = (obj) => {
    if (obj.location == 'constant') {
        // console.log(obj)
        return [
            `@${obj.arg}`,
            `D=A`,
            `@SP`,
            `A=M`,
            `M=D`,
            `@SP`,
            `M=M+1`
        ]
    }
    else if (obj.location == 'static') {
        console.log(obj)
        let staticNum = Number(obj.arg) + 16
        if (staticNum > 255) { return 'STATIC VAR TOO LARGE (in push)' }
        return [
            `@${staticNum}`,
            `D=M`,
            `@SP`,
            `A=M`,
            `M=D`,
            `@SP`,
            `M=M+1`
        ]
    }
    else if (obj.location == 'local') {
        let localNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@LCL`,
            `D=D+M`,
            `A=D`,
            `D=M`,
            `@SP`,
            `M=M+1`,
            `A=M-1`,
            `M=D`
        ]
    }
    else if (obj.location == 'argument') {
        let argNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@ARG`,
            `D=D+M`,
            `A=D`,
            `D=M`,
            `@SP`,
            `M=M+1`,
            `A=M-1`,
            `M=D`
        ]
    }
    else if (obj.location == 'this') {
        let thisNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@THIS`,
            `D=D+M`,
            `A=D`,
            `D=M`,
            `@SP`,
            `M=M+1`,
            `A=M-1`,
            `M=D`
        ]
    }
    else if (obj.location == 'that') {
        let thatNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@THAT`,
            `D=D+M`,
            `A=D`,
            `D=M`,
            `@SP`,
            `M=M+1`,
            `A=M-1`,
            `M=D`
        ]
    }
    else if (obj.location == 'temp') {
        let tempNum = Number(obj.arg) + 5 // unused??
        if (tempNum > 12) { return 'TEMP VAR TOO LARGE (in push)' }
        return [
            `@${tempNum}`,
            `D=M`,
            `@SP`,
            `M=M+1`,
            `A=M-1`,
            `M=D`
        ]
    }
    else if (obj.location == 'pointer') {
        let pointerNum = Number(obj.arg) + 3
        if (pointerNum > 4) { return 'Pointer VAR TOO LARGE (in pop)' }
        return [
            `@${pointerNum}`,
            `D=M`,
            `@SP`,
            `M=M+1`,
            `A=M-1`,
            `M=D`,
        ]

    }
    else {
        console.log(obj)
        return [`ELSE: INVALID PUSH`, ` (FOR NOW)`]
    }
}
const makeAsmCommandPop = (obj) => {
    console.log(obj)
    if (obj.location == 'static') {
        let staticNum = Number(obj.arg) + 16
        if (staticNum > 255) { return 'STATIC VAR TOO LARGE (in pop)' }
        return [
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@${staticNum}`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]
    }
    else if (obj.location == 'local') {
        let localNum = Number(obj.arg) + 0 // unused??
        return [   
            `@${obj.arg}`,
            `D=A`,
            `@LCL`,  // could refactore this for local/LCL, arg/ARG, this/THIS, that/THAT
            `D=D+M`,
            `@R13`,
            `M=D`,
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@R13`,
            `A=M`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]
    }
    else if (obj.location == 'argument') {
        let argNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@ARG`,
            `D=D+M`,
            `@R13`,
            `M=D`,
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@R13`,
            `A=M`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]
    }
    else if (obj.location == 'this') {
        let thisNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@THIS`,
            `D=D+M`,
            `@R13`,
            `M=D`,
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@R13`,
            `A=M`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]
    }
    else if (obj.location == 'that') {
        let thatNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@THAT`,
            `D=D+M`,
            `@R13`,
            `M=D`,
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@R13`,
            `A=M`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]
    }
    else if (obj.location == 'temp') {
        let tempNum = Number(obj.arg) + 5 // unused??
        if (tempNum > 12) { return 'TEMP VAR TOO LARGE (in pop)' }
        return [
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@${tempNum}`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]

    }
    else if (obj.location == 'pointer') {
        let pointerNum = Number(obj.arg) + 3
        if (pointerNum > 4) { return 'Pointer VAR TOO LARGE (in pop)' }
        return [
            `@SP`,
            `A=M-1`,
            `D=M`,
            `@${pointerNum}`,
            `M=D`,
            `@SP`,
            `M=M-1`
        ]

    }
    else { return [`POP: `, `NOT IMPLIMENTED YET`] }  // should use proper error reporting, this causes unusable output vs failures if incorrect
}
const makeAsmCommandCompare = (obj) => {
    uniqindx = uniqindx + 1
    uniqueId = obj.uniqueName + "." + uniqindx
    console.log('the unique number is ' + uniqindx + ' and name is ' + obj.uniqueName)

    return [`@SP`,
        `A=M-1`,
        `D=M`,
        `A=A-1`,
        `D=M-D`,
        `@IS.${uniqueId}`,
        `D;J${obj.command.toUpperCase()}`,     // toUpperCase() and reference used to remove 3x code
        `@SP`,
        `A=M`,
        `A=A-1`,
        `A=A-1`,
        `M=0`,
        `D=A+1`,
        `@SP`,
        `M=D`,
        `@END.${uniqueId}`,
        `0;JMP`,
        `(IS.${uniqueId})`,
        `@SP`,
        `A=M`,
        `A=A-1`,
        `A=A-1`,
        `M=-1`,
        `D=A+1`,
        `@SP`,
        `M=D`,
        `@END.${uniqueId}`,
        `0;JMP`,
        `(END.${uniqueId})`,
    ]
}
const makeAsmCommandBasicLogic = (obj, logic, secondMove) => {

    return [
        `@SP`,
        `A=M-1`,
        `D=M`,
        `A=A${secondMove}`,
        `M=${logic}`,
        `D=A+1`,
        `@SP`,
        `M=D`
    ]
}

// ### Path and filename modifications ###
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


// ### EXPORTS ###
module.exports = {
    makeArray,
    removeComments,
    cleanArray,
    makeComObj,
    makeAsmCommand,
    extractFilename,
    extractFilePath
}



// ### Debug Area (i still use console.log) ###
// console.log(makeAsmCommand(testObj2))
