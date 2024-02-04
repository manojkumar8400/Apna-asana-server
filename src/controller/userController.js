const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

exports.registerUser = catchAsyncErrors ( async (req, res, next) => {

    const content = req.body;  // body se data liya
    const user = await User.create(content);

    sendToken(user, 200, res);
});

exports.loginUsers = catchAsyncErrors ( async (req, res, next) => {
    const { email, password } = req.body;

    // Checking if user is given password and email both
    if(!email && !password){
        return next(new ErrorHandler("Please enter a email & password", 400));
    }

    const user = await User.findOne({email}).select("+password")  // schema m password select false kiya tha isiliye yahan select method ka use kiya h

    if(!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMetched = await user.comparePassword(password);

    if(!isPasswordMetched) {
        return next(new ErrorHandler("Invalid Email or Passworddd", 401));
    }

    sendToken(user, 200, res);

});