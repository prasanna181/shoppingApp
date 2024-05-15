import mongoose, { trusted } from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  Wishlist: {
    type: Array,
    default: [],
  },

  addtocart: {
    type: Array,
    defalut: [],
  },
  saveForLater: {
    type: Array,
    default: [],
  },
});

const signupLogin = mongoose.model("signupLogin", userSchema);

// user.insertOne({Category:"shirts",Brands:[0]});

export default signupLogin;
