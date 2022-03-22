'use strict'

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3030;

const router = require("./routes/auth");

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("اهلا وسهلا ");
});


app.use(router);


function start() {
  app.listen(PORT, () => {
    console.log(`server is standing on ${PORT}`);
  });
}

module.exports = {
  start: start,
};
