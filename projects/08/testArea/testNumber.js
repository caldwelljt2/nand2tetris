let commandLine = 'D=A-1'

const r = (arr, repeats) => {
    let myArr = Array.from({ length: repeats }, () => {
        console.log(arr)
        return arr
      })
    return myArr;
}

let number = '2'

let array = ['1',...r(
    `item,item2`
    ,number-1)[0].split(','),'3']

// let array2 = ['first',...('D=A-1,'.repeat(4).split(',')), 'moo']
console.log(array)


// let array3 = 'D=A-2'