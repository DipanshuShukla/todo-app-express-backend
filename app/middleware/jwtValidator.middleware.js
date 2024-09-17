const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_KEY;

const validateJWT = (req, res, next) => {
    try {
        var token = req.headers.authorization;

        if (token) {
            token = token.split(" ")[1];

            const user = jwt.verify(token, SECRET);
            req.userId = user.id;

            next();
        } else {
            res.status(401).json({ message: "Unauthorized access!" });
        }
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            res.status(403).json({ message: "Forbidden." });
        } else {
            res.status(401).json({ message: "Unauthorized access!" });
        }
    }
};

module.exports = validateJWT;
