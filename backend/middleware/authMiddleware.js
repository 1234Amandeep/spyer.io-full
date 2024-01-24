const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

module.exports.checkUser = async (req, res, next) => {
  // res.send("hey");
  const token = req.cookies.jwt;
  console.log("token inside middleware: ", token);

  if (token) {
    // verifying jwt token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        // token exist but not valid so user is not logged in
        res.status(200).json({ user: null, msg: "token is invalid" });
        next();
      } else {
        // token exist and its valid so user is logged in
        const user = await userModel.findById(decodedToken.id);
        res.status(200).json({
          user: { _id: user._id, email: user.email, favList: user.favList },
        });
        next();
      }
    });
  } else {
    // token does'nt exist so user is not logged in
    res.status(200).json({ user: null, msg: "token does not exists" });
    next();
  }
};

// module.exports.requireAuth = async (req, res, next) => {
//   const token = req.cookies.jwt;

//   if (token) {
//     // verifying jwt token is valid
//     jwt.verify(token, "spyer.io", async (err, decodedToken) => {
//       if (err) {
//         res.status(200).json({ user: null });
//       } else {
//         // user verified
//         const user = await userModel.findById(decodedToken.id);
//         next()
//       }
//     });
//   }
//   res.status(200).json({ user: null });
// };
