const userModel = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports.addToWishlist_post = async (req, res) => {
  const favList = req.body.favList;
  // console.log(favList);

  const token = req.cookies.jwt;

  if (token) {
    // verifying jwt token
    jwt.verify(token, "spyer.io", async (err, decodedToken) => {
      if (err) {
        // token exist but not valid so user is not logged in
        res.status(200).json({ user: null });
      } else {
        // token exist and its valid so user is logged in
        const user = await userModel.findByIdAndUpdate(decodedToken.id, {
          favList: favList,
        });

        const updatedUser = await userModel.findById(decodedToken.id);

        res.status(200).json({ user: updatedUser });
      }
    });
  } else {
    // token does'nt exist so user is not logged in
    res.status(200).json({ user: null });
  }
};

module.exports.removeFromWishlist_post = async (req, res) => {
  const favList = req.body.favList;

  console.log(favList);

  const token = req.cookies.jwt;

  if (token) {
    // verifying jwt token
    jwt.verify(token, "spyer.io", async (err, decodedToken) => {
      if (err) {
        // token exist but not valid so user is not logged in
        res.status(200).json({ user: null });
      } else {
        // token exist and its valid so user is logged in
        const user = await userModel.findByIdAndUpdate(decodedToken.id, {
          favList: favList,
        });

        const updatedUser = await userModel.findById(decodedToken.id);

        res.status(200).json({ user: updatedUser });
      }
    });
  } else {
    // token does'nt exist so user is not logged in
    res.status(200).json({ user: null });
  }
};
