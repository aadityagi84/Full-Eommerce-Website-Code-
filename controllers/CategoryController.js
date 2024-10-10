const Category = require("../models/CategoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;

    // Validate if name is provided
    if (!name) {
      return res.status(400).send({
        message: "Category name is required.",
      });
    }

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(409).send({
        success: false,
        message: "Category already exists.",
      });
    }

    // Create new category
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();

    // Send success response
    return res.status(201).send({
      success: true,
      message: "New category created successfully.",
      category,
    });
  } catch (error) {
    console.error(error);

    // Send error response
    return res.status(500).send({
      success: false,
      message: "Error in category creation.",
      error,
    });
  }
};

const updateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Update Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).status({
      success: false,
      error,
      message: "Error in Updation of Category",
    });
  }
};
const handleCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    res.status(200).send({
      success: true,
      message: "all Category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while getting all Category",
    });
  }
};
// single category
const handleSingleCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      category,
      message: "Product Successfully Shown",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error occurred while fetching the category",
    });
  }
};
// delete category
const handleDeleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id); // Pass `id` directly
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while deleting category",
    });
  }
};

module.exports = {
  createCategoryController,
  updateController,
  handleCategory,
  handleDeleteCategory,
  handleSingleCategory,
};
