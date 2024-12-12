const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return sign;
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return null;
    }
}

module.exports = { tokenSign, verifyToken };