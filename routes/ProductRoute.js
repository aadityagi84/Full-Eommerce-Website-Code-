const express = require("express");
const {
  requireSignIn,
  requireIsAdmin,
} = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  handleProductController,
  getSingleProduct,
  getProductPhotoController,
  getProductController,
  deleteProductController,
  handleUpdateProductController,
  productFilterController,
  productCountController,
  singlePageController,
  searchProductController,
  handleRelatedProductsController,
  handleProductCategoryController,
  barintreeTokenController,
  barintreePaymentController,
} = require("../controllers/ProductController");
const formidable = require("express-formidable");

router.post(
  "/create-product",
  requireSignIn,
  requireIsAdmin,
  formidable(),
  handleProductController
);

// to get the all over Products
router.get("/products", getProductController);
// to get single products
router.get("/products/:slug", getSingleProduct);
// to get PRoduct Photo
router.get("/products-photo/:pid", getProductPhotoController);
// delete Products
router.delete("/products-delete/:pid", deleteProductController);
// to update Products
router.put(
  "/update-product/:pid",
  requireSignIn,
  requireIsAdmin,
  formidable(),
  handleUpdateProductController
);

// to filter by Product
router.post("/product-filters", productFilterController);

// product -count
router.get("/product-count", productCountController);
// product per-page get
router.get("/product-list/:page", singlePageController);

// search Products
router.get("/search/:keyword", searchProductController);
// similar Products
router.get("/related-products/:pid/:cid", handleRelatedProductsController);

// get categorywise Product
router.get("/product-category/:slug", handleProductCategoryController);

// payment Route
// token
router.get("/braintree/token", barintreeTokenController);

// to do payments
router.post("/braintree/payment", requireSignIn, barintreePaymentController);

module.exports = router;
