require("dotenv").config();
const express = require("express")
const cors = require("cors")
const app = require("./database");
const usersRouter = require("./routes/users");

const port = process.env.PORT;

app.use(cors())
app.use(express.json())

app.use("/users", usersRouter)

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})