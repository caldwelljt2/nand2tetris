const fs = require('fs');

// const { myProg2 } = require('./data.js');

// const myProg = myProg2


// Make there is a file on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME.asm FILENAME.hack');
    process.exit(1);
  }
  // Read the file and print its contents.
//   var fs = require('fs')
    let filename = process.argv[2]
    let filenameOutput = process.argv[3]
  fs.readFile(filename, 'utf8', function(err, myProg) {
    if (err) throw err;
    console.log('OK: ' + filename + ' will be assmbled as ' + filenameOutput);
    // console.log(data)



    
    const {
        symbolsArray,
        openParenth,
        closedParenth,
        comments,
        // symbolsArray,
        // destinationArray,
        // commandArray,
        // jumpArray,
        whitespace,
        makeBinary
    } = require('./functions')
    
    const sanitizeArray = (array) => {
        const nocommentsArray = array.replace(comments, '').split("\n")
        const deWhiteSpacedArray = nocommentsArray.map((item) => {
            return item.replace(whitespace, '')
        })
        const cleanArray = deWhiteSpacedArray.filter(v => v)
        return cleanArray
    }
    
    const cleanArray = sanitizeArray(myProg)
    
    for (let index = 0; index <= cleanArray.length; index++) {
        const item = cleanArray[index];
        if (openParenth.test(item)) {
            symbolsArray.push([item.replace(openParenth, '').replace(closedParenth, ''), index])
            cleanArray.splice(index, 1)
            index--
        }
    }
    
    const finalOutput = cleanArray.map((item) => {
        return makeBinary(item)
    })
    
    const finalOutputAsString = finalOutput.join('\r\n');
    
    fs.writeFile(filenameOutput, finalOutputAsString, (err) => {
        if (err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });
    
    fs.writeFile(filenameOutput + "symbols", symbolsArray.join('\r\n'), (err) => {
        if (err) {
            throw err;
        }
        console.log("Symbols have been written to file for verification.");
    });
});