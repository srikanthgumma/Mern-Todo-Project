const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");

//sign up
router.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const hashedpassword = bcrypt.hashSync(password);
        const user = new User({ email, username, password: hashedpassword });
        await user.save().then(() => {
            res.status(200).json({ message: "Sign up successful" });
            return;
        })
    } catch (error) {
        res.status(200).json({ message: "User already Exists" })
        return;
    }
});

//sign in
router.post("/signin", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(200).json({ message: "please sign up first" });
            return;
        }
        const ispasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!ispasswordCorrect) (
            res.status(200).json({ message: "password is not correct" })

        )
        const { password, ...others } = user._doc;
        res.status(200).json({ others });
        return;
    } catch (error) {
        // console.log(error);
        res.status(200).json({ message: "User alredy Exists" })
        return;
    }
})

module.exports = router