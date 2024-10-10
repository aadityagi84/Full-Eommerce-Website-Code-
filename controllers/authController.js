const { hashPass, comparePassword } = require("../helpers/authHelper");
const users = require("../models/UserModel");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { name, email, address, phone, password, answer } = req.body;

    // Log to check request body
    console.log(req.body);

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone number is required" });
    }

    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    const exisitingUser = await users.findOne({ email });
    if (exisitingUser) {
      return res.status(201).send({
        success: false,
        message: "Already Registered Please Login",
        user: usermodel,
      });
    }

    // Hash password and save the user as before
    const hashedPassword = await hashPass(password);
    const usermodel = new users({
      name,
      email,
      address,
      phone,
      password: hashedPassword,
      answer,
    });

    await usermodel.save();
    return res.status(201).send({
      success: true,
      message: "User Registered successfully",
      user: usermodel,
    });
  } catch (error) {
    console.log("Error in registerController:", error);
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// method POST But USing in Login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: "invalid  user credential " });
    }

    // to decrypt the password which will be save in database
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "invalid password ",
      });
    }

    // if the all over condtion will work correctly then crete a token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.status(200).send({
      success: true,
      message: "login Successfully ",
      // all of the data variable
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        adress: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: " login faild",
      error,
    });
  }
};

// test route for protected route using JWT

const testRoute = (req, res) => {
  console.log("protected Routes ");
  res.send(`Protected Route`);
};

// forgert password
const handleForgotPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    // Validate input fields
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is required" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Check for user by email and answer
    const user = await users.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Wrong Email or Answer" });
    }

    // Hash the new password
    const hashed = await hashPass(newPassword);

    // Update the user's password
    await users.findByIdAndUpdate(user._id, { password: hashed });

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// update user profile
const UpdateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await users.findById(req.user._id);

    // Check password length if a new password is provided
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password is required and must be at least 6 characters long",
      });
    }

    // Hash the new password if provided
    const hashPassword = password ? await hashPass(password) : undefined;

    // Update the user fields, using the provided data or the existing user data
    const updatedUser = await users.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashPassword || user.password,
        email: email || user.email,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true } // Return the updated document
    );

    // Send a success response
    res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    // Send a failure response
    res.status(400).send({
      success: false,
      message: "Unable to update profile",
      error: error.message, // Send the error message
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testRoute,
  handleForgotPassword,
  UpdateProfileController,
};
