const slugify = require("slugify");
const ProductModel = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const fs = require("fs");
require("dotenv").config();

const braintree = require("braintree");
const OrderModels = require("../models/OrderModels");

// payment Gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

const handleProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validations
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Product name is required" });
      case !description:
        return res
          .status(400)
          .send({ error: "Product description is required" });
      case !price:
        return res.status(400).send({ error: "Product price is required" });
      case !category:
        return res.status(400).send({ error: "Product category is required" });
      case !quantity:
        return res.status(400).send({ error: "Product quantity is required" });
      case photo && photo.size > 1000000: // Check if photo size exceeds 1MB
        return res
          .status(400)
          .send({ error: "Photo size should be less than 1MB" });
    }

    // Create a new product with provided fields
    const product = new ProductModel({ ...req.fields, slug: slugify(name) });

    // Handle photo upload if provided
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // Save the product to the database
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product, // Ensure product data is returned
    });
  } catch (error) {
    console.error("Product creation error:", error.message); // Log error for debugging
    res.status(500).send({
      success: false,
      message: "An error occurred while creating the product",
      error: error.message, // Send the detailed error message
    });
  }
};

// controll thr all over products for frontent using get method
const getProductController = async (req, res) => {
  try {
    const products = await ProductModel.find({})
      .populate("category")
      .select("-photo") // Exclude the 'photo' field
      .limit(12) // Limit the result to 12 products
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    // Check if products exist
    if (!products || products.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).send({
      success: true,
      totalProducs: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error); // More descriptive error log
    res.status(500).send({
      success: false,
      message: "Unable to fetch Products",
      error: error.message,
    });
  }
};

// get single product usning slug
const getSingleProduct = async (req, res) => {
  try {
    const { slug } = req.params; // Extract the slug from request parameters
    const product = await ProductModel.findOne({ slug })
      .populate("category")
      .select("-photo"); // Query using slug directly

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to find product using parameter",
      error: error.message,
    });
  }
};

// to find the photo of all over products

const getProductPhotoController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to find product Photo",
      error: error.message,
    });
  }
};

// delete Product
const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Delete Succesfully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Not able to Delete PRoduct",
      error: error.message,
    });
  }
};

// update Product
const handleUpdateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validations
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case !quantity:
        return res.status(400).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    // Find product by ID and check if it exists
    const product = await ProductModel.findById(req.params.pid);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    // Update the product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.quantity = quantity || product.quantity;
    product.shipping = shipping || product.shipping;
    product.slug = slugify(name);

    // Handle photo if provided
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save(); // Save updated product to DB

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};
// product filter
const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body; // Destructure correctly
    let args = {};

    // If categories are checked, add to filter arguments
    if (checked && checked.length > 0) args.category = { $in: checked };

    // If radio has a valid price range, add price filter
    if (radio && radio.length === 2) {
      args.price = { $gte: radio[0], $lte: radio[1] }; // Set price range filter
    }

    // Query products based on filters
    const products = await ProductModel.find(args);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error filtering products:", error);
    res.status(500).send({
      success: false,
      message: "Product could not be filtered",
      error,
    });
  }
};
// product count
const productCountController = async (req, res) => {
  try {
    const total = await ProductModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.send(400).send({
      message: "Error in Product",
      error,
      success: false,
    });
  }
};

// singlepage controller function

const singlePageController = async (req, res) => {
  try {
    const perPage = 4;
    const page = req.params.page ? req.params.page : 1;
    const products = await ProductModel.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAT: -1 });
    res.status(200).send({
      success: true,

      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};
// search Controller

const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await ProductModel.find({
      $or: [
        {
          // to remove case sensitive form the search filter
          name: { $regex: keyword, $options: "i" },
        },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "unable to search",
      error,
    });
  }
};

// realted product controller
const handleRelatedProductsController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    //   console.log("Received pid:", pid, "cid:", cid); // Debugging

    if (!pid || !cid) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or category ID",
      });
    }

    const products = await ProductModel.find({
      category: cid,
      _id: { $ne: pid },
    })
      .limit(4)
      .populate("category")
      .select("-photo");

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error while fetching related products:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching related products",
    });
  }
};

// get product by their category
const handleProductCategoryController = async (req, res) => {
  try {
    const { slug } = req.params; // Corrected here

    const category = await Category.findOne({ slug });
    const products = await ProductModel.find({ category }).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Unable to find Products",
      error,
    });
  }
};

// payment gateway controller
// token
const barintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// do payments
const barintreePaymentController = async (req, res) => {
  // noce is the inbuld keyword comes from the  Braintree api documentation
  try {
    const { cart, nonce } = req.body;
    let tottal = 0;
    cart.map((i) => {
      total += i.price;
    });
    let;
    newTransition = gateway.transaction.sale(
      {
        amout: total,
        PaymentMethodNonce: nonce,
        options: {
          sumitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new OrderModels({
            product: cart,
            payment: result,
            // ye user._id humne requireSignIn ka middleware create kiya uss se sign in hoga
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send({
            error,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handleProductController,
  getProductController,
  getSingleProduct,
  getProductPhotoController,
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
};
