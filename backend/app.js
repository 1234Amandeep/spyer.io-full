const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fetchRouter = require("./routes/fetchRoutes");
const authRouter = require("./routes/authRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fetchRouter);
app.use(authRouter);

const dbURI =
  "mongodb+srv://1234amandeep:ilovefootball%401234@spyer.dtt7kqo.mongodb.net/auth?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then(() => {
    app.listen("4000", () => {
      console.log("After connecting to auth db, listening at port 4000...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// basic routes
app.get("/", authMiddleware.checkUser);
