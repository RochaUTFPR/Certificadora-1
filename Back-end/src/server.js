const express = require("express");

require("./config/database");

const {Port, PORT} = require("./config/env")

const app = express();

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});