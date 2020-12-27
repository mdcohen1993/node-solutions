const http = require("http");
const fs = require("fs");
const port = 8080;

const server = http.createServer((req, res) => {
  let filePath;
  switch (req.url) {
    case "/":
      filePath = "./public/index.html";
      break;
    case "/about":
      filePath = "./public/index.html";
      break;
    default:
      filePath = "./public/404.html";
  }

  fs.readFile(filePath, (err, data) => {
    if(err){
      res.statusCode(500)
      res.end()
    }
    else{
      res.write(data)
    }
  })
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
