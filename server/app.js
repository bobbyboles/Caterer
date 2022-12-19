const express = require("express");
const cors = require('cors')
const path = require("path");
const volleyball = require("volleyball");
const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(cors());
app.use(volleyball);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;
