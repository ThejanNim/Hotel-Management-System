const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({error: "A token is required for authentication"});
    } 
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({error: "Invalid Token"})
    }
}

module.exports = verifyToken;