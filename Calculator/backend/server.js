const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
const port = 3000;
const records = [];

// Middleware:-
app.use(bodyParser.json())
app.use(cors())

app.post('/', (req, res) => {
    const record = req.body
    records.push(record)
    res.send(records)
})

app.get('/', (req, res) => {
    res.json(records)
})

app.listen(port, () => {
    console.log("Your app is running on http://localhost:3000");
})