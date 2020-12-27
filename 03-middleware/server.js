const express = require("express");
const app = express();
const fs = require("fs");
const port = 5000;

const logger = (req, res) => {
  const dateNow = new Date(Date.now());
  const newLog = {
    url: req.params.url,
    method: req.method,
    Duration: new Date(Date.now()) - dateNow,
  };
  fs.appendFile("log.txt", newLog, (err) => {
    if (err) console.log(err);
    else console.log(newLog);
  });
};

app.use(logger);

app.get("/", function (req, res) {
  res.sendFile("./context.txt");
});

app.listen(port, () => {
  console.log(`Now listening at http://localhost:${port}`);
});
