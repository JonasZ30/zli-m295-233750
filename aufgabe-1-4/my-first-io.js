const fs = require ("fs");

const inhalt = fs.readFileSync(process.argv[2])
const line = inhalt.toString().split("\n").length - 1
console.log(line)