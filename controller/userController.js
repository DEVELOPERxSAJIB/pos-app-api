const User = require("../model/User");
const { errorResponse, successResponse } = require("./responseController");

// create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return errorResponse(res, {
        statusCode: 400,
        message: "All feilds are required",
      });
    }

    const existsUser = await User.findOne({ email: email });
    if (existsUser) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User with this email already exists",
      });
    }

    if (password !== confirmPassword) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Confirm password not match",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
    });

    successResponse(res, {
      statusCode: 200,
      message: "User register successfully",
      payload: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// user login controller
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkUserExists = await User.findOne({ email });

    if (!checkUserExists) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User not found",
      });
    }

    if (checkUserExists.password !== password) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Password not match",
      });
    }

    if (checkUserExists.isVerified === false) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User is not Verified",
      });
    }

    const user = await User.findOne({ email })

    successResponse(res, {
      message: 200,
      message: "Login successfull",
      payload : user
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createUser,
  userLogin,
};
