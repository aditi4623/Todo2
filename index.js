const express = require('express')
const app = express()

const port = process.env.PORT || 3031;
var cors = require('cors')
app.use(cors())

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { ADD_TASK, DELETE_TASK, EDIT_TASK, MARK_COMPLETE, GET_TASK } = require('./query')
app.post('/', ADD_TASK);
app.delete('/', DELETE_TASK);
app.put("/:id", EDIT_TASK);
//to access id we use params
app.put("/mark/:id", MARK_COMPLETE);
app.get('/', GET_TASK);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port)