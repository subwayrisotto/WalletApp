require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = require("./database");
const usersRouter = require("./routes/users");

app.use(cors())
app.use(express.json())

app.use("/users", usersRouter)

app.listen(4000, () => {
    console.log("Server started on port 4000");
})