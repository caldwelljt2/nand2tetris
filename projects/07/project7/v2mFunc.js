let testObj = { command: 'push', location: 'constant', arg: '888' }
let testObj2 = { command: 'sub' }
let uniqindx = 0


// setup some search criteria
const openParenth = /\(/g
const closedParenth = /\)/g
const comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
const whitespace = /\s/g

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

const makeComObj = (array) => {
    const arrayWithOjb = array.map((line) => {
        let lineAsArray = line.split(" ")
        let obj = {}
        obj.command = lineAsArray[0]
        obj.location = lineAsArray[1]
        obj.arg = lineAsArray[2]
        return obj
    })
    return arrayWithOjb
}

const makeAsmCommand = (obj) => {
    // console.log(obj)
    if (obj.command == 'push') {
        return makeAsmCommandPush(obj)
    } else if (obj.command == 'pop') {
        return makeAsmCommandPop(obj)
    } else {
        return makeAsmCommandLogic(obj)
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
    } else if (obj.location == 'static') {
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
            // `M=M-1`,  // ooops, we don't change this value, it's a base
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
            // `M=M-1`, // ooops, we don't change this value, it's a base
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
            // `M=M-1`,  // ooops, we don't change this value, it's a base
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
            // `M=M-1`,  // ooops, we don't change this value, it's a base
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
            `M=D`,
            // `@SP`, // not needed if combined above
            // `M=M-1`
        ]
    } else if (obj.location == 'pointer') {
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
    } else if (obj.location == 'local') {
        let localNum = Number(obj.arg) + 0 // unused??
        return [
            `@${obj.arg}`,
            `D=A`,
            `@LCL`,
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
    } else if (obj.location == 'argument') {
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
    } else if (obj.location == 'this') {
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
    } else if (obj.location == 'that') {
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
    } else if (obj.location == 'temp') {
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

        // return [
        //     `@${obj.arg}`,
        //     `D=A`,
        //     `@TEMP`,
        //     `D=D+M`,
        //     `@R13`,
        //     `M=D`,
        //     `@SP`,
        //     `A=M-1`,
        //     `D=M`,
        //     `@R13`,
        //     `A=M`,
        //     `M=D`,
        //     `@SP`,
        //     `M=M-1`
        // ]
    } else if (obj.location == 'pointer') {
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
    else { return [`POP: `, `NOT IMPLIMENTED YET`] }
}

const makeAsmCommandLogic = (obj) => {
    let logic = 'THIS SHOULD GET CHANGED'
    let secondMove = '-1'
    if (obj.command == 'sub') {
        logic = 'M-D'
        // secondMove assumed
    }
    if (obj.command == 'add') {
        logic = 'M+D'
        // secondMove assumed
    } 
    if (obj.command == 'neg') {
        logic = '-D'
        secondMove = '' // don't move 2nd time (this will leave A=A)!!
    }
    if (obj.command == 'and') {
        logic = 'D&M'
        // secondMove assumed
    }
    if (obj.command == 'or') {
        logic = 'D|M'
        // secondMove assumed 
    }
    if (obj.command == 'not') {
        logic = '!D' 
        secondMove = '' // don't move 2nd time (this will leave A=A)!!
    }
    if (obj.command == 'lt') {
        uniqindx = uniqindx + 1
        return [
            `@SP`,
            `A=M-1`,
            `D=M`,
            `A=A-1`,
            `D=M-D`,
            `@IS.${uniqindx}`,
            `D;JLT`,
            `@SP`,
            `A=M`,
            `A=A-1`,
            `A=A-1`,
            `M=0`,
            `D=A+1`,
            `@SP`,
            `M=D`,
            `@END.${uniqindx}`,
            `0;JMP`,
            `(IS.${uniqindx})`,
            `@SP`,
            `A=M`,
            `A=A-1`,
            `A=A-1`,
            `M=-1`,
            `D=A+1`,
            `@SP`,
            `M=D`,
            `@END.${uniqindx}`,
            `0;JMP`,
            `(END.${uniqindx})`,
        ]

    }
    if (obj.command == 'gt') {
        uniqindx = uniqindx + 1
        return [
            `@SP`,
            `A=M-1`,
            `D=M`,
            `A=A-1`,
            `D=M-D`,
            `@IS.${uniqindx}`,
            `D;JGT`,
            `@SP`,
            `A=M`,
            `A=A-1`,
            `A=A-1`,
            `M=0`,
            `D=A+1`,
            `@SP`,
            `M=D`,
            `@END.${uniqindx}`,
            `0;JMP`,
            `(IS.${uniqindx})`,
            `@SP`,
            `A=M`,
            `A=A-1`,
            `A=A-1`,
            `M=-1`,
            `D=A+1`,
            `@SP`,
            `M=D`,
            `@END.${uniqindx}`,
            `0;JMP`,
            `(END.${uniqindx})`
        ]
    }
    if (obj.command == 'eq') {
        uniqindx = uniqindx + 1
        return [`@SP`,
            `A=M-1`,
            `D=M`,
            `A=A-1`,
            `D=M-D`,
            `@IS.${uniqindx}`,
            `D;JLT`,
            `@SP`,
            `A=M`,
            `A=A-1`,
            `A=A-1`,
            `M=0`,
            `D=A+1`,
            `@SP`,
            `M=D`,
            `@END.${uniqindx}`,
            `0;JMP`,
            `(IS.${uniqindx})`,
            `@SP`,
            `A=M`,
            `A=A-1`,
            `A=A-1`,
            `M=-1`,
            `D=A+1`,
            `@SP`,
            `M=D`,
            `@END.${uniqindx}`,
            `0;JMP`,
            `(END.${uniqindx})`,

        ]
    }

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



// console.log(makeAsmCommand(testObj2))

module.exports = {
    makeArray,
    removeComments,
    cleanArray,
    makeComObj,
    makeAsmCommand
}