const jwt = require("jsonwebtoken")

exports.Protected = (req, res, next) => {
    const user = req.cookies.user
    if (!user) {
        return res.status(401).json({ message: "No cookie found" })
    }
    jwt.verify(user, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(500).json({ message: err.message || "Invalid Token" })
        }
        req.user = decode.userId
        next()
    })

}