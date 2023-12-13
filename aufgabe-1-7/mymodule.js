const fs = require("fs")
const path = require("path")

module.exports = function (dir, filterStr, callback) {
    fs.readdir(dir, function (error, data) {
      if (error) {
        return callback(error)
      }
  
      data = data.filter(function (file) {
        return path.extname(file) === '.' + filterStr
      })
  
      callback(null, data)
    })
  }