const express = require("express");
const fetchController = require("../controllers/fetchController");
const dbInterController = require("../controllers/dbInterController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes

router.get("/fetch/:playerName", fetchController.fetch_get);

// add to whishlist route

router.post(
  "/addToWishlist",
  // authMiddleware.requireAuth,
  dbInterController.addToWishlist_post
);

router.post("/removeFromWishlist", dbInterController.removeFromWishlist_post);

module.exports = router;
