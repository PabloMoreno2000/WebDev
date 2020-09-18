const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

function processParams(req) {
  return Object.assign({}, req.body, req.params, req.query);
}

app.get("/user", function (req, res) {
  let params = processParams(req);
  console.log(params);
  res.cookie("userData3", "data");
  console.log(req.cookies);
  res.send(params);
});

// crear something from data in body
app.post("/user", (req, res) => {
  debugger;
  let params = processParams(req);
  console.log(params);
  res.send({ params, data2: "some more data" });
});
// update of something that exist with the entire doc
app.put("/user/:id/:someOtherValue", (req, res) => {
  let params = processParams(req);
  console.log(req.headers.authorization);
  res.send(params);
});
// update of something that exist with partial doc
app.patch("/user/:id", (req, res) => {
  let params = processParams(req);
  console.log(params);
  res.send(params);
});

app.listen(3000);
