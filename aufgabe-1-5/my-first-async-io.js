const fs = require("fs")

const file = process.argv[2]

fs.readFile(file, function callback(error, data){
    if (error){
     return console.log(error)
    }
    const content = data.toString().split("\n").length - 1;
    console.log(content)
})
