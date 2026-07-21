import User from "../models/user.js";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";

export const signup = async (req, res) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const existingUser = await User.findOne({
      email: req.body.email
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email/User already exists!"
      })
    }

    const user = new User({
      ...req.body,
      password: hashedPassword
    });

    await user.save();

    return res.status(201).json({
      success: true,
      message: "User created Successfully."
    })
  }

  catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!"
    })
  }
}


export const login = async (req, res) => {

  try {
    const user = await User.findOne({
      email: req.body.email
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!"
      })
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "incorrect password!"
      })
    }

    const token = jsonwebtoken.sign({
      id: user._id,
      email: user.email
    }, process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      })

    return res.status(200).json({
      success: true,
      message: "Login Successful.",
      token,
      user: {
        name: user.name,
        email: user.email
      }
    })
  }

  catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!"
    })
  }
}


