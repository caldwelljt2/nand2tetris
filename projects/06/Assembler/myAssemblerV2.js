const fs = require('fs');

const {myProg2} = require('./data.js');
// const { commandArray } = require('./symbols.js');

const {
    openParenth,
    closedParenth,
    comments,
    symbolsArray,
    destinationArray,
    commandArray,
    jumpArray,
    whitespace,
    } = require('./symbols.js')

const myProg = myProg2

let myArray = myProg.replace(comments, '').split("\n")

const deWhiteSpacedArray = myArray.map((item) => {
    return item.replace(whitespace, '')
})

cleanArray = deWhiteSpacedArray.filter(v => v)

for (let index=0; index<=cleanArray.length; index++) {
    const item = cleanArray[index];
    if (openParenth.test(item)) {
        symbolsArray.push([item.replace(openParenth, '').replace(closedParenth, ''), index])
        cleanArray.splice(index, 1)
        index--
    }
}

// cleanArray.forEach((item, index) => {
//     if (openParenth.test(item)) {
//         symbolsArray.push([item.replace(openParenth, '').replace(closedParenth, ''), index])
//         cleanArray.splice(index, 1);
//     }
// })




let deLooopedArray = cleanArray.map((item) => {

    let removeAt = item.replace('@', '')
    if (/^[A-Za-z]+$/g.test(removeAt)) {
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


// let distnationArrayOutput = deLooopedArray.map((item) => {

//     destinationArray.forEach((symbol) => {
//         // console.log(item, symbol[0])
//         item = item.replace(symbol[0], symbol[1])
//         // if (item == symbol[0] +  "=") { // need to change to search portion (regex.replace ?? )
//         //     // console.log('wooot!')
//         //     item = '@' + symbol[1]
//         // }
//     }
//     )
//     return item
// })


// let commandArrayOutput = distnationArrayOutput.map((item) => {

//     commandArray.forEach((command) => {
//         // console.log(item, command[0])
//         item = item.replace(command[0], command[1])
//         // if (item == command[0] +  "=") { // need to change to search portion (regex.replace ?? )
//         //     // console.log('wooot!')
//         //     item = '@' + command[1]
//         // }
//     }
//     )
//     return item
// })


let tester = 0
let makeBinary = function (input) {
    // console.log(tester++, input)
    let opC = "111"
    let jump = "000" // need to set default to 000 ???? 
    let command = "0000000"
    let destination = "010" // need to sete a Default for optional?
    let strippedCommand = input.split("=")[1]

    if (input.includes('@')) {
        let justNumber = input.replace('@', "")
        return "0" + (justNumber * 1).toString(2).padStart(15, '0') // overrides use of C op output with leading 0 + address (need 0's added so this equals 15/16 digits)

    }

    if (input.includes(';')) {
        jumpArray.forEach((jumpCommand) => {
            if (input.includes(jumpCommand[0])) {
                // if (!jumpCommand[1]) {
                    console.log(jumpCommand[0] + " is " + jumpCommand[1])
                // }
                jump = jumpCommand[1]
            }
        })
    }

    if (input.includes('=')) {
        destinationArray.forEach((destinationCommand) => {
            if (input.includes(destinationCommand[0])) {
                destination = destinationCommand[1]
            }
        })
    }

    commandArray.forEach((commandCommand) => {
        if (strippedCommand == commandCommand[0]) {
            command = commandCommand[1]
        }
    })
    // if (jump = NaN ) {
    //     console.log(jump + " is not a number!")
    // }
    return opC + command + destination  + jump 
}

let finalOutput = deLooopedArray.map((item) => {
    // console.log(makeBinary(item))
    return [item,makeBinary(item)]
}
)


let finalOutputAsString = finalOutput.join('\r\n');

// console.log(finalString);
// console.log(cleanArray)
// console.log(commandArrayOutput)
fs.writeFile('file.txt', finalOutputAsString, (err) => {
    if(err) {
        throw err;
    }
    console.log("Data has been written to file successfully.");
});

// console.log(symbolsArray)

fs.writeFile('symbols.txt', symbolsArray.join('\r\n'), (err) => {
    if(err) {
        throw err;
    }
    console.log("Data has been written to file successfully.");
});

console.log(deLooopedArray)
console.log(cleanArray)