const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const apiRoutes = require('./routes/routes');

app.use(express.json(), cors());
app.use("/api", apiRoutes);

exports.handler = serverless(app);
