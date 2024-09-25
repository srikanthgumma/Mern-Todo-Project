const express = require('express');
const auth = require("./routes/auth");
const list = require("./routes/list")
const cors = require("cors")
const app = express();
const path = require("path");
require('./connectors/connec');

app.use(express.json());
app.use(cors())

// app.get('/', (req, res) => {
//     res.status(200).json('Hello, I am live');
//     return;
// })

app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

app.listen(1000, () => {
    console.log("server running on port number--", 1000);
})