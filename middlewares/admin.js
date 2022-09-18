const verifyAdmin = (req, res, next) => {
    if (req.user.userRole == 'admin') {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized"});
    }
}

module.exports = verifyAdmin;