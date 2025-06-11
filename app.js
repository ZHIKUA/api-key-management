const express = require('express');
const app = express();
const dbService = require("./service.js");
const autoRenewal = require("./auto-renewal.js");
require("dotenv").config();

app.post("/developers", (req, res) => {
    let {name, email} = req.body;
    let message = dbService.addDeveloper(name, email);
    res.send(message);
});

app.post("/apikeys", (req, res) => {
    let { developer_id } = req.body.developer_id;
    let apiKeyString = crypto.randomUUID();
    let message = dbService.addApiKey(apiKeyString, developer_id);
    res.send(message);
});

app.post("/ping", (req, res) => {
    let apiKeyString = req.header('X-API-KEY');
    let message = dbService.getApiKeyByString(apiKeyString);
    res.send(message);
});

app.get("/usage", (req, res) => {
    let developer_id = req.query.developer_id;
    let summary = dbService.getSummaryByDeveloperId(developer_id);
    res.json(summary);
});

autoRenewal(dbService);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});