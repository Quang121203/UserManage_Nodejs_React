var jwt = require('jsonwebtoken');
require('dotenv').config()

const createJWT = (payload) => {
    const key = process.env.JWT_SECRET;
    const token = jwt.sign(payload, key);
    return token;
}

const verifyJWT = (token) => {
    const key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);

    }
    return decoded;
}



const checkUser = (req, res, next) => {
    const cookies = req.cookies;
    if (cookies && cookies.jwt) {
        const token = verifyJWT(cookies.jwt);
        if (token) {
            req.user = token;
            req.token = cookies;
            return next();
        }
        else {
            return res.status(401).json({
                EC: 1,
                EM: "Login Error",
            })
        }
    }
    else {
        return res.status(200).json({
            EC: 10,
            EM: "Login please form Middleware",
        })
    }


}

const checkPremistion = (req, res, next) => {
    if (req.user.groupWithRole.some(item => (req.path == item.Roles.url || req.path.includes(item.Roles.url)))) {
        return next();
    }
    return res.status(403).json({
        EC: 1,
        EM: "you dont have permission to here",
    });
}

module.exports = { createJWT, verifyJWT, checkUser, checkPremistion }