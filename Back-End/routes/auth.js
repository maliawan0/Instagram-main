const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const { jwtSecret } = require("../keys");
const tokenauth = require("../middleware/token");

// Simple email regex
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post('/signup', (req, res) => {
    const { email, username, password } = req.body;

    // Boundary Value Checks
    if (!email || !username || !password) {
        return res.status(422).json({ error: "Please enter all the required fields" });
    }
    if (username.length < 3 || username.length > 15) {
        return res.status(400).json({ error: "Username must be 3–15 characters" });
    }
    if (!isValidEmail(email) || email.length > 50) {
        return res.status(400).json({ error: "Invalid email format or too long" });
    }
    if (password.length < 6 || password.length > 20) {
        return res.status(400).json({ error: "Password must be 6–20 characters" });
    }

    User.findOne({ email: email })
        .then((SavedUser) => {
            if (SavedUser) {
                return res.status(422).json({ error: "User already exists" });
            }

            const user = new User({ email, username, password });

            user.save()
                .then(user => {
                    res.json({ message: "User Details saved successfully" });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: "Error saving user" });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Login Validation
    if (!username || !password) {
        return res.status(422).json({ error: "Please enter all the required fields" });
    }
    if (username.length < 3 || username.length > 15) {
        return res.status(400).json({ error: "Invalid username length" });
    }
    if (password.length < 6 || password.length > 20) {
        return res.status(400).json({ error: "Invalid password length" });
    }

    User.findOne({ username: username })
        .then(SavedUser => {
            if (!SavedUser || password !== SavedUser.password) {
                return res.status(422).json({ error: "Invalid Username/Password" });
            }

            const token = jwt.sign({ _id: SavedUser._id }, jwtSecret);
            const { _id, username, followers, following } = SavedUser;
            res.json({ token, user: { _id, username, followers, following } });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
});

module.exports = router;
