fs = require("fs");

let msg = '';
for (let i = 2; i < process.argv.length; i++) {
  msg += process.argv[i].toString()
  msg += ' '
}


fs.writeFile("./myLogs.txt", msg, (err) => {
  if (msg) {
    let newDate = new Date(Date.now());
    let day = newDate.getDate().toString();
    let month = newDate.getMonth().toString();
    let year = newDate.getFullYear().toString();
    let date = `${day}/${month}/${year}`;
    let hour = newDate.getHours().toString();
    let minutes = newDate.getMinutes().toString();
    let seconds = newDate.getSeconds().toString();
    let time = `${hour}:${minutes}:${seconds}`;

    console.log(`${date} 
       ${time} 
       ${msg}`);
  } else if (err) {
    console.log(err);
  }
});
