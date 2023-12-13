const mymodule = require("./mymodule.js")

const dir = process.argv[2]
const filterStr = process.argv[3]

mymodule(dir, filterStr, function (error, data) {
  if (error) {
    return console.error(error)
  }

  data.forEach(function (file) {
    console.log(file)
  })
})