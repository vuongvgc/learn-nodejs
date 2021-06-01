const fs = require("fs");
const hello = "Hello World ";
console.log(hello);
const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textInput);
const textOutput = `This is what you know about the avocado ${textInput} \nCreate date: ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOutput);
console.log("Write Output");
