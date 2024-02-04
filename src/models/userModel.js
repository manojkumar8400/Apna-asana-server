const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Name can not exceded more than 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true, // always email unique
    validate: [validator.isEmail, 'Please enter a valid email'], // check email validity
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should be at least 8 characters'],
    select: false, //jab find() ka use karke userInfo access karega to use password show nhi karega
  },
  avatar: String,
  userId: Number,
  token: String,
  role: {
    type: String,
    default: 'user',
  },
  // reserPasswordToken: String,
  // resetPasswordExpire: Date,
})

// Generate JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
  // return await bcrypt.compare(enteredPassword, this.password);
  return await enteredPassword === this.password;
};

module.exports = mongoose.model('User', userSchema)
