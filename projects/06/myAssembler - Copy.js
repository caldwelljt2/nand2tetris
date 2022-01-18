// setup some search criteria

const fs = require('fs');

fs.readFile('output.asm', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // console.log(data);
    // rework to pull from external file
    let myProg = data
    // let myProg = `
    // @256
    // D=A
    // @SP`

    let openParenth = /\(/g
    let closedParenth = /\)/g
    let comments = /\/\*[\s\S]*?\*\/|\/\/.*/g
    let whitespace = /\s/g

    // this array will be modified and must be run fresh or reset if processng more than one
    variableIndex = 16
    let symbolsArray = [
        ['SCREEN', 16384],
        ['KBD', 24576],
        ['SP', 0],
        ['LCL', 1],
        ['ARG', 2],
        ['THIS', 3],
        ['THAT', 4],
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
    ]


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





    let myArray = myProg.replace(comments, '').split("\n")

    const deWhiteSpacedArray = myArray.map((item) => {
        // let whiteSpaceRemoved = item.replace(whitespace, '')
        // if (whiteSpaceRemoved != "") {
        //     return whiteSpaceRemoved
        // }
        return item.replace(whitespace, '')
    })

    cleanArray = deWhiteSpacedArray.filter(v => v)

    cleanArray.forEach((item, index) => {
        if (openParenth.test(item)) {
            symbolsArray.push([item.replace(openParenth, '').replace(closedParenth, ''), index])
            cleanArray.splice(index, 1);
        }
        // console.log(item)
    })
    // console.log(symbolsArray)
    // console.log(cleanArray.some(r => symbolsArray.indexOf(r)))
    // console.log(cleanArray)
    // console.log(cleanArray.indexOf('@R1'))
    let deLooopedArray = cleanArray.map((item) => {

        let removeAt = item.replace('@', '')
        if (/^[A-Za-z]+$/g.test(removeAt)) {
            // console.log('found some o dat')
            symbolsArray.push([removeAt, variableIndex++])
        }

        symbolsArray.forEach((symbol) => {
            if (item == '@' + symbol[0]) {
                item = '@' + symbol[1]
            }
        }
        )
        return item

    })


    let distnationArrayOutput = deLooopedArray.map((item) => {

        destinationArray.forEach((symbol) => {
            // console.log(item, symbol[0])
            item = item.replace(symbol[0], symbol[1])
            // if (item == symbol[0] +  "=") { // need to change to search portion (regex.replace ?? )
            //     // console.log('wooot!')
            //     item = '@' + symbol[1]
            // }
        }
        )
        return item
    })


    let commandArrayOutput = distnationArrayOutput.map((item) => {

        commandArray.forEach((command) => {
            // console.log(item, command[0])
            item = item.replace(command[0], command[1])
            // if (item == command[0] +  "=") { // need to change to search portion (regex.replace ?? )
            //     // console.log('wooot!')
            //     item = '@' + command[1]
            // }
        }
        )
        return item
    })


    console.log(deLooopedArray)
    // console.log(distnationArrayOutput)
    // console.log(commandArrayOutput)


    let makeBinary = function (input) {
        let opC = "111"
        let jump = "010" // need to set default to 000 ???? 
        let command = "000000"
        let destination = "010" // need to sete a Default for optional?
        let strippedCommand = input.split("=")[1]

        if (input.includes('@')) {
            // console.log('found it')
            let justNumber = input.replace('@', "")
            return (justNumber * 1).toString(2).padStart(16, '0') // overrides use of C op output with leading 0 + address (need 0's added so this equals 15/16 digits)

        }

        if (input.includes(';')) {
            // console.log('got here in jump') // got through jump array and set jump =
            jumpArray.forEach((jumpCommand) => {
                if (input.includes(jumpCommand[0])) {
                    jump = jumpCommand[1]
                    // strippedCommand = strippedCommand.replace(jumpCommand[0],"")
                }
            })
        }

        if (input.includes('=')) {
            // console.log('got here destination') // got through jump array and set jump =
            // can use ? const foundItem = items.find((item) => {item.value = 100})
            // or leave this the same since jump overights as it gets "better" results and just remove before = later ?
            destinationArray.forEach((destinationCommand) => {
                if (input.includes(destinationCommand[0])) {
                    destination = destinationCommand[1]
                    // strippedCommand = strippedCommand.replace(destinationCommand[0],"")

                }
            })
        }

        // if (input.includes('=')) {
        // console.log('got here destination') // got through jump array and set jump =
        // can use ? const foundItem = items.find((item) => {item.value = 100})
        // or leave this the same since jump overights as it gets "better" results and just remove before = later ?
        commandArray.forEach((commandCommand) => {
            // console.log('does '+strippedCommand + " = " +  commandCommand[0])
            if (strippedCommand == commandCommand[0]) {
                command = commandCommand[1]
                // strippedCommand = strippedCommand.replace(commandCommand[0],"")
            }
        })
        // }
        // do the same for command and destitation (set command = || destination = )
        // at the end return C code with two 11 then each binary subset in correct order
        // console.log(strippedCommand)
        return opC + destination + command + jump
    }

    // still need to pad the addresses to 16 bit and fix Jumps to send relevant commands?


    // console.log(makeBinary('D;JGT'))  // issue is finding D=0 in AMD=0 and similar
    let outputArray = []
    
    deLooopedArray.forEach((item) => {
        // console.log(item + ' should be ' + makeBinary(item))
        outputArray.push(makeBinary(item))

    }
    )

    let outputString  = outputArray.join('\r\n');
    // console.log(outputString);

    console.log(cleanArray)


    fs.writeFile('output', outputString, (err) => {
        if (err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });


}); // end of read  file dialog