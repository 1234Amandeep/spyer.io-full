const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// handling errors
const handleErrors = (err) => {
  const errors = { email: "", password: "" };

  // incorrect email error
  if (err.message === "incorrect email") {
    errors.email = "that email is not registerd";
  }

  // incorrect password error
  if (err.message === "incorrect password") {
    errors.password = "that password is incorrect";
  }

  // validating errors

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  // console.log(err.message);

  // dupliacte error
  if (err.code === 11000) {
    errors.email = "that email already exists";
  }

  console.log(errors);
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
// creating fn to create Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

module.exports.signup_post = async (req, res) => {
  const { email, password, favList } = req.body;

  try {
    // adding user to db
    const user = await userModel.create({ email, password, favList });

    // creating token
    const token = createToken(user._id);

    // console.log(token);

    // setting jwt into cookies
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: "None",
      secure: true,
    });

    // sending response to client
    res
      .status(201)
      .json({ _id: user._id, email: user.email, favList: user.favList });
  } catch (err) {
    err = handleErrors(err);
    res.status(400).json(err);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // trying to login user
    const user = await userModel.login(email, password);

    if (user) {
      const token = createToken(user._id);
      console.log(token);

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
        sameSite: "None",
        secure: true,
      });
      res
        .status(200)
        .json({ _id: user._id, email: user.email, favList: user.favList });
    }
  } catch (error) {
    const errors = handleErrors(error);

    res.status(400).json(errors);
  }
};

module.exports.logout_get = (req, res) => {
  console.log("inside logout");
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 1,
    sameSite: "None",
    secure: true,
  });
  res.redirect("/");
};
