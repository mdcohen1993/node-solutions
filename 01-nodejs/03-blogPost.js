const http = require("http");
const fs = require('fs')
const blogPost = require('./blogPost.txt')
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end();
});

fs.readFile("./blogPost.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});


server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });