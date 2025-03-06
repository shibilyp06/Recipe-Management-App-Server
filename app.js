const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("./config/config");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const commonRouter = require("./router/commonRouter");
app.use("/", commonRouter);

const serverPort = 5000;
app.listen(serverPort, () => {
  console.log("server connected");
});
