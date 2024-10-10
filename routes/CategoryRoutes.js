const express = require("express");
const {
  requireSignIn,
  requireIsAdmin,
} = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  handleCategory,
  handleSingleCategory,

  updateController,
  handleDeleteCategory,
} = require("../controllers/CategoryController");
const router = express.Router();

// create category route
router.post(
  "/create-category",
  requireSignIn,
  requireIsAdmin,
  createCategoryController
);

// update Category Routes
router.put(
  "/update-category/:id",
  requireSignIn,
  requireIsAdmin,
  updateController
);
// to get the all over category
router.get("/categories", handleCategory);

// to get the Single category by id
router.get("/categories/:slug", handleSingleCategory);
// delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  requireIsAdmin,
  handleDeleteCategory
);

module.exports = router;
