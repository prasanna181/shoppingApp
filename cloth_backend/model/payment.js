import mongoose, { trusted } from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },

    order: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const payment = mongoose.model("payment", userSchema);

export default payment;
