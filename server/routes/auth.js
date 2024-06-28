//const express = require("express");
//const User = require("../models/user");
//
//const authRouter = express.Router();
//
//authRouter.post("/api/signup" , async (req, res) => {
//    try {
//        const { name, email, profilePic } = req.body;
//
//        let user = User.findOne({ email });
//
//        if(!user) {
//            user = new User({
//                email,
//                profilePic,
//                name,
//            });
//            user = await user.save();
//        }
//
//        res.json({ user });
//    } catch (e) {}
//});
//
//module.exports = authRouter;


const express = require("express");
const User = require("../models/user");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
    try {
        const { name, email, profilePic } = req.body;

        let user = await User.findOne({ email }); // Use await to handle the promise

        if (!user) {
            user = new User({
                email,
                profilePic,
                name,
            });
            user = await user.save();
        }

        const token = jwt.sign({ id: user._id }, "passwordKey");

        res.json({ user, token });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

authRouter.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ user, token: req.token });
});

module.exports = authRouter;
