const fs = require("fs");
const http = require("http");
const url = require("url");
/////////////////////////
//////     FILE    /////
///////////////////////
// Blocking  - Synchronous
// const hello = "Hello World ";
// console.log(hello);
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);
// const textOutput = `This is what you know about the avocado ${textInput} \nCreate date: ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOutput);
// console.log("Write Output");

// Non - Blocking - Asynchronous
// fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
//   console.log(data);
// });
// fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
//   if (error) return console.log("Now !, Error");
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (error, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2} \n${data3}`, function (error) {
//         console.log("write this function");
//       });
//     });
//   });
// });
/////////////////////////
//////    SERVER    /////
///////////////////////
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is overView");
  } else if (pathName === "/product") {
    res.end("this is page product");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello World",
    });
    res.end("<h1>Page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("The server is running");
});
