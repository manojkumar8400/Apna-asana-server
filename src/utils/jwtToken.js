const User = require("../models/userModel");

// Create token and saving in cookie

const sendToken = async (user, statusCode, res) => {

    let token = user.getJWTToken()
    // Update user model with token
    user = await User.findByIdAndUpdate(user._id, {token: token});

    // option for cookie
    const options = {     // Cookie expire time
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        statusCode: 200,
        success: true,
        user,
        token
    });
}

module.exports = sendToken;