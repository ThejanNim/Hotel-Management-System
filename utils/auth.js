const jwt = require("jsonwebtoken");

exports.createJWT = (email, _id, userRole, duration) => {
   const payload = {
      email,
      _id,
      userRole,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};