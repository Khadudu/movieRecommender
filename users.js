const brain = require("brain.js");
const fs = require("fs");

const users1 = fs.readFileSync("../data/CurrentUserSession.txt", "utf8");
const json = users1
  .split(/\n|\r\n/)
  .map((line) => {
    const values = line.split(",");
    let obj = {};
    obj[values[0]] = {
      userid: values[0],
      productId: values[1],
    };
    return obj;
  })
  .reduce((acc, current) => Object.assign(acc, current), {});
const jsonArr = Object.values(json);

console.log(jsonArr);

var net = new brain.recurrent.LSTM();
net.train([
  { input: ["comedy", "Action"], output: "1" },
  { input: ["comedy", "Thriller"], output: "1" },
  { input: ["Thriller", "Action"], output: "0" },
  { input: ["Drama", ""], output: "1" },
]);

console.log("output = " + net.run("drive"));

output = hardware;
