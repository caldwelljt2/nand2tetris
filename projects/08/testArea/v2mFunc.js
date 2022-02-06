// ### Temp Test Area, should be safe to ignore

// let testObj = { command: 'push', location: 'constant', arg: '888' }
let testObj2 = { command: 'return', uniqueName: 'someFilename'}

// ### Start of function exports 
let uniqindx = 0  // used to create unique symbol names in ASM files, dirty but works, leave global to avoid overlapping
let uniqueId = ''

// setup some regex variables
const openParenth = /\(/g
const closedParenth = /\)/g
const comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
const whitespace = /\s/g


// ### Functions for creating clean arrays or items to work with
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

const r = (arr, repeats) =>                 // for repeating single items x times (pair with ...)
  Array.from({ length: repeats }, () => arr);

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
        case 'label':
            return [`(${obj.location})`]
            break;
        case 'goto':
            return makeAsmCommandGoto(obj)
            break;
        case 'if-goto':
            return makeAsmCommandIfGoto(obj)
            break;
        case 'function':
            makeAsmCommandFunction(obj)
            break;
        case 'call':
            return makeAsmCommandCall(obj)
            break
        case 'return':
            return makeAsmCommandReturn(obj)
            break
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
const makeAsmCommandIfGoto = (obj) => {
    return [
        `@SP`,
        `A=M-1`,
        `D=M`,
        `@${obj.location}`,
        `D;JMP`
    ]
}
const makeAsmCommandGoto = (obj) => {
    return [
        `@${obj.location}`,
        `0;JMP`
    ]
}
const makeAsmCommandFunction = (obj) => {
    // get args #
    // NEED FILE REFERENCE for calling merged .vm trees
    
    return [
        // save return @address
        'NOT',
        'TESTED',
        `@${'NEED LINK TO LABEL'}`,
        'D=A', // save current location in program ?
        '@SP',
        // 'D=M', // save SP value in D - NO? we don't save pointer location, but above program location?
        'A=M', // point A at the SP value
        'M=D',  // save address for later use,
        '@LCL', // goto current arg storage location
        'D=M', // get ARG location in D,
        '@SP', 
        'A=M',
        'A=A+1',
        'M=D', 

        '@ARG', 
        'D=M',
        '@SP', 
        'A=M',
        'A=A+1',
        'A=A+1',
        'M=D', 

        '@THIS', 
        'D=M',
        '@SP', 
        'A=M',
        'A=A+1',
        'A=A+1',
        'A=A+1',
        'M=D', 

        '@THAT', 
        'D=M',
        '@SP', 
        'A=M',
        'A=A+1',
        'A=A+1',
        'A=A+1',
        'A=A+1',
        'M=D', 

// set
        '@SP',
        'A=M',
        'A=M-1', // move up 1 for first arg
        ...r('A=A-1',arg - 1), //repeate for # additional args
        'D=A',
        '@ARG',
        'M=D',

        '@SP',
        'A=M',
        ...r('A=A+1',5), 
        'D=A',
        '@LCL',
        'M=D',
        'A=M',
            ...r(
        'M=0,A=A+1' // these two commands repeate for each argument, set to 0, move down 1 x(arg) times
            ,arg)[0].split(','), // clear new lcl while here? set to args?A=0
//        'A=A+1', // go down 1 more for SP location - NOT NEEDED since above is setting 0 THEN moving
        'D=A', // save to D
        '@SP', // go to SP address storage
        'M=D' // change pointer to new SP value
        // copy caller data @(lcl,arg,this,that) (local range? or is the higher resonsibility?)
        //create locals AND SET TO 0 ???
        // change @args ??? to point at functions args, place at base @ARG?
        // execute callers code (how does code get inserted here?)
    ]
}
const makeAsmCommandCall = (obj) => {
    return [
        'NOT',
        'TESTED',
        `(${obj.location + 'RETURN'})`
        `@${obj.location}`,
        '0;JMP'
                // return value to saved return address
        // cleanup/recycle used mem (just moving @SP does this right?)
        // return copy caller data @(lcl,arg,this,that) (local range? or is the higher resonsibility?)
        // set @SP = new base address ?? (needs double checked)
        // return to executing code @JMP ?
    ]
    
}
const makeAsmCommandReturn = (obj) => {
    uniqindx = uniqindx + 1
    uniqueId = obj.uniqueName + "." + uniqindx
    console.log('the unique number is ' + uniqindx + ' and name is ' + obj.uniqueName)
        return [
        'NOT',
        'IMPLEMENTED',
        // save returned value
        '@SP', // go to sp
        'A=M', // go to the line below last value
        'A=A-1', // point above at last value
        'D=A', // save in D
        '@ARG', // goto ARG location (address)
        'A=M', // goto location (base address)
        'M=A', // leave answer in first arg space

        // save return address to goto later (we'll be wiping out our point of reference with LCL)
        '@LCL',
        'A=M',
        'A=A-1', // this (saved)
        'A=A-1', // that (saved)
        'A=A-1', // ARG (saved)
        'A=A-1', // LCL (saved)
        'A=A-1', // Return Address
        'D=M', // saved return address
        '@ARG', // current ARG location
        'A=M', // go there
        'A=A+1', // go down one
        'M=D', // save return location in SP location (need to clear out later?)
        'D=A', // get new SP location
        '@SP', // goto SP pointer
        'M=D', // save caller's SP location (SP now caller's reference)

        // restore caller's state
        // this
        '@LCL',
        'A=M',
        'A=A-1', // this (saved)
        'D=M',
        'M=0',
        '@THIS',
        'M=D',

        // that
        '@LCL',
        'A=M',
        'A=A-1', // this (saved)
        'A=A-1', // that (saved)
        'D=M',
        'M=0',
        '@THAT',
        'M=D',

        // ARG
        '@LCL',
        'A=M',
        'A=A-1', // this (saved)
        'A=A-1', // that (saved)
        'A=A-1', // ARG (saved)
        'D=M',
        'M=0',
        '@THIS',
        'M=D',
        // LCL
        '@LCL',
        'A=M',
        'A=A-1', // this (saved)
        'A=A-1', // that (saved)
        'A=A-1', // ARG (saved)
        'A=A-1', // LCL (saved)
        'D=A',
        '@R13', // save top of ARGS for clearing later
        'M=D',
        'A=D',
        'D=M',
        'M=0', // CLEARED OUT LOCAL STORAGE all old values need to clear ARG area - DO @ END before jmp?
        '@LCL',
        'M=D',


        '@SP', // obj doesn't contain location ???!?!?! put in SP ?
        'D=M', // save return jump location
        'M=0', // clear SP
        'A=D',
        '0;JMP',

// below not done

        'D=A', // save ARG location in D
        '@R13',
        'M=D',
        `(CLEARARGS.${uniqueId})`,
        

// below temp added via notepad (need to clear BEFORe loop)
// save a location in R13, then a. gets top, b. clears, c. compairs if next should clear, d. jumps back if needed else continues
        // (label)
        // @R15 (temp)
        // D=M
        // @SP
        // D=D-M
        // @label
        // D;JGE (jump if > 0 )
        // M=0

                // return value to saved return address
        // cleanup/recycle used mem (just moving @SP does this right?)
        // return copy caller data @(lcl,arg,this,that) (local range? or is the higher resonsibility?)
        // set @SP = new base address ?? (needs double checked)
        // return to executing code @JMP ?
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
console.log(makeAsmCommand(testObj2))
// console.log(makeAsmCommandReturn(testObj2))
