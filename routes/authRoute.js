const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  testRoute,
  handleForgotPassword,
  UpdateProfileController,
} = require("../controllers/authController");

const {
  requireSignIn,
  requireIsAdmin,
} = require("../middlewares/authMiddleware");
//
//
//
//
//
//
//
//
// register route
router.post("/register", registerController);

// login route || post req
router.post("/login", loginController);

// forget password || method Post
router.post("/forgot-password", handleForgotPassword);

// test routes---  means Protected Route using JWT -
router.get("/test", requireSignIn, requireIsAdmin, testRoute);

// Protected Route auth

// user Private Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// admin Private Route
router.get("/admin-auth", requireSignIn, requireIsAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update Profile
router.put("/profile", requireSignIn, UpdateProfileController);

module.exports = router;
