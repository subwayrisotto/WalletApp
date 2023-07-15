const User = require("../models/usersModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const contacts = await User.find();
    res.status(200).json(contacts);
});

router.post("/signup", async (req, res) => {
    try{
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.status(409).json({ message: "Email in use" });
            console.log("Email in use")
            return;
        }

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
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;