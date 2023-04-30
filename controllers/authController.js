import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

//@desc: to register and hash password
//@endpoint: /api/v1/auth/register
//@method: POST
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "Name is required!" });
    }
    if (!email) {
      return res.send({ message: "Email is required!" });
    }
    if (!password) {
      return res.send({ message: "Password is required!" });
    }
    if (!phone) {
      return res.send({ message: "Phone is required!" });
    }
    if (!address) {
      return res.send({ message: "Address is required!" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required!" });
    }

    //check user's existance:
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({
          success: true,
          message: "Email Id already registered. Please Login",
        });
    }

    //hash Password and save data:
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      err,
    });
  }
};

//@desc: to login and  send JWT
//@endpoint: /api/v1/auth/login
//@method: POST
export const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid  email or password" });
    }

    //check if user exists:
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "email not registered.!" });
    }
    //compare password
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Password Incorrect!" });
    }

    //Create JWT:
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "User Login Successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      err,
    });
  }
};

//@desc: forgot-password controller
//@endpoint: /api/v1/auth/forgot-password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required!" });
    }
    if (!answer) {
      return res.status(400).send({ message: "answer is required!" });
    }
    if (!newPassword) {
      return res.status(400).send({ message: "newPassword is required!" });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "Email or Answer not correct." });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    res
      .status(200)
      .send({ success: true, message: "Password Reset Succcessfully" });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      err,
    });
  }
};

//@desc: protected route testing:
//@endpoint: /api/v1/auth/test
export const testController = async (req, res) => {
  try {
    res.status(200).send("Protected Route");
  } catch (err) {
    console.log(err);
  }
};

//@desc: update profile
//@endpoint: /api/v1/auth/profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};
