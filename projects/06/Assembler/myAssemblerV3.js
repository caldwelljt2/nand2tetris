const fs = require('fs');

const {myProg2} = require('./data.js');
// const { commandArray } = require('./symbols.js');

const myProg = myProg2

const {symbolsArray} = require('./functions.js')
const {
    openParenth,
    closedParenth,
    comments,
    // symbolsArray,
    // destinationArray,
    // commandArray,
    // jumpArray,
    whitespace,
} = require('./symbols.js')

const {makeBinary} = require('./functions');


let sanitizeArray = (array) => {
    const nocommentsArray = array.replace(comments, '').split("\n")
    const deWhiteSpacedArray = nocommentsArray.map((item) => {
        return item.replace(whitespace, '')
    })
    const cleanArray = deWhiteSpacedArray.filter(v => v)
    return cleanArray
}

let cleanArray = sanitizeArray(myProg) // myProg.replace(comments, '').split("\n")

// const deWhiteSpacedArray = myArray.map((item) => {
//     return item.replace(whitespace, '')
// })

// cleanArray = deWhiteSpacedArray.filter(v => v)

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




// let deLooopedArray = cleanArray.map((item) => {

//     console.log('look here' + item)
//     if (item.includes('(')) { 
//         let  label = item.split("(")[0]


//      }

//     if (true) {
//     //     // test if only number
//     //     if (address * 1 == address) {
//     //         commandObject.address = address * 1
//     //     } else {
//     //         commandObject.address = getAddSymbol(address)
//     //     }
//     //     commandObject.binaryOutput = "0" + (commandObject.address * 1).toString(2).padStart(15, '0')
//     // }

// }



//     // let removeAt = item.replace('@', '')
//     // console.log(removeAt)
//     // let testIt = 
//     // if (/^[A-Za-z]+$/g.test(removeAt)) {
//     //     symbolsArray.push([removeAt, variableIndex++])
//     // }

//     // symbolsArray.forEach((symbol) => {
//     //     console.log(symbol)
//     //     if (item == '@' + symbol[0]) {
//     //         item = '@' + symbol[1]
//     //     }
//     // }
//     // )
//     // return item

// })


let finalOutput = cleanArray.map((item) => {
    // console.log(makeBinary(item))
    return makeBinary(item)
}
)


let finalOutputAsString = finalOutput.join('\r\n');


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

// console.log(deLooopedArray)
console.log(cleanArray)
