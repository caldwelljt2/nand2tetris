// load file library
const fs = require('fs');

// load some values and core binary function moved out to keep main file cleaner
const {
    symbolsArray,  // starting array, intention is to mutate it as we go
    openParenth, // left over from initial regex approach but still used
    closedParenth, // same as above
    comments, // regex expression to identify all comments for removal
    whitespace, // could be added with above, but left for simplicity, identifys any leftover whitespace for removal
    makeBinary // main function for constructing a binary A or C instruction (assumes there are no loops present, variables are OK)
} = require('./functions')

console.log('starting to work')

// Make sure there is a file on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME.asm FILENAME.hack');
    process.exit(1);
  }
    let filename = process.argv[2] // input file
    let filenameOutput = process.argv[3] // output file
  fs.readFile(filename, 'utf8', function(err, myProg) {
    if (err) throw err;
    console.log('OK: ' + filename + ' will be assmbled as ' + filenameOutput);
    
    // remove comments and whitspace from array
    const sanitizeArray = (array) => {                            
        const nocommentsArray = array.replace(comments, '').split("\n")
        const deWhiteSpacedArray = nocommentsArray.map((item) => {
            return item.replace(whitespace, '')
        })
        const cleanArray = deWhiteSpacedArray.filter(v => v)
        return cleanArray
    }
    
    // execute above function which could be moved to functions file if needed
    const cleanArray = sanitizeArray(myProg)
    
    // if a line contains a "(", then treat it like label, add it to symbols and remove it from the array of commands
    for (let index = 0; index <= cleanArray.length; index++) {
        const item = cleanArray[index];
        if (openParenth.test(item)) {
            symbolsArray.push([item.replace(openParenth, '').replace(closedParenth, ''), index])
            cleanArray.splice(index, 1)
            index--  // important step, required to handle jitter caused by slicing a file in the middle of looping through the same array
        }
    }
    
    // turn each line into a binary command 
    const finalOutput = cleanArray.map((item) => {
        return makeBinary(item)
    })
    
    // merge array and add carriage returns
    const finalOutputAsString = finalOutput.join('\r\n');
    
    // write assembly file
    fs.writeFile(filenameOutput, finalOutputAsString, (err) => {
        if (err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });
    
    // write symbols used to additional file (not needed but useful for troubleshooting)
    fs.writeFile(filenameOutput + "symbols", symbolsArray.join('\r\n'), (err) => {
        if (err) {
            throw err;
        }
        console.log("Symbols have been written to file for verification.");
    });
});