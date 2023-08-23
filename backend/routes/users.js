const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// Register a new user
router.post("/register", async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "Username is already taken"
            });
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            userId: savedUser._id
        });
    } catch (err) {
        console.error("Error in user registration:", err);
        res.status(500).json({
            success: false,
            error: "Failed to register user"
        });
    }
});


// login purpose
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
     
        if (!user) {
            return res.status(400).json(
           
                "Wrong username or password"
            );
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json(
                
                "Wrong username or password"
            );
        }

        res.status(200).json({
           
            _id: user._id,
            username: user.username
        });
    } catch (err) {
        console.error("Error in user login:", err);
        res.status(500).json({
            
            error: "Server error"
        });
    }
});

module.exports = router;
 