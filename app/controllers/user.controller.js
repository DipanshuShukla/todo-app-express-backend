const bcrypt = require("bcrypt");
const userModel = require("../models/user.schema");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (user)
            return res
                .status(409)
                .json({ message: `User already exists with email: ${email}` });

        const hashedPassword = await bcrypt.hash(password, 7);

        const newUser = await userModel.create({
            name,
            email,
            hashedPassword,
        });

        const token = jwt.sign(
            {
                name,
                email,
                id: newUser._id,
            },
            SECRET
        );

        return res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user)
            return res
                .status(404)
                .json({ message: `No user found with email: ${email}` });

        const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword
        );

        if (!isPasswordValid)
            return res.status(401).json({ message: "Incorrect Password!" });

        const token = jwt.sign(
            {
                name: user.name,
                email: user.email,
                id: user._id,
            },
            SECRET
        );

        return res.status(200).json({ token });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Oops! something went wrong" });
    }
};

module.exports = {
    login,
    signup,
};
