const User = require("../models/usersModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const contacts = await User.find();
    res.status(200).json(contacts);
});

router.post("/signup", async (req, res) => {
    // const body = req.body.email;
    // console.log(body)
    
    // res.send(body)
    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName
    });
    console.log(newUser)
    await newUser.save();

    res.status(201).json({
        user: {
          email: newUser.email,
          firstName: newUser.firstName,
          password: newUser.password,
        },
    });
});

module.exports = router;