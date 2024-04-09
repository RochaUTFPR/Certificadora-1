const express = require("express");

require("./config/database");

const {Port, PORT} = require("./config/env")

const userRoutes = require("./routes/users.routes");
const authenticateRoutes = require("./routes/authenticate.routes");
const questionRoutes = require("./routes/questions.routes")

const app = express();

app.use(express.json())

app.use(userRoutes);
app.use(questionRoutes)
app.use(authenticateRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});