const fs = require("fs");
const http = require("http");
const url = require("url");

// my own modules

const replaceTemplate = require("./modules/replaceTemplate");

// Third party modules

const slugify = require("slugify");

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
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
// console.log(data);

// console.log(slugify("vuong Do", { lower: true, replacement: "_" }));
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  // console.log(query);
  // OVERVIEW
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const htmlCard = dataObject
      .map((el) => replaceTemplate(templateCard, el))
      .join(" ");
    // console.log(htmlCard);
    const output = templateOverview.replace(/{%PRODUCT_CARD%}/g, htmlCard);
    res.end(output);
    // PRODUCT
  } else if (pathname === "/product") {
    const productObj = dataObject[query.id];
    const output = replaceTemplate(templateProduct, productObj);
    res.writeHead(200, { "content-type": "text/html" });
    res.end(output);
    // API
  } else if (pathname === "/api") {
    fs.readFile("./dev-data/data.json", (error, data) => {
      // const dataJS = JSON.parse(data);
      // console.log(dataJS);
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(data);
    });
    // res.end("API");
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
