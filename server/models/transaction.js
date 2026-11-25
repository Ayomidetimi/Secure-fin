
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  recipientName: {
    type: String,
    required: true
  },

  bankName: {
    type: String,
    default: ""
  },

  accountNumber: {
    type: String,
    required: true
  },

  transferType: {
    type: String,
    enum: ["user", "bank"],
    required: true
  },

  amount: {
    type: Number,
    required: true,
    min: 0.01
  },

  fee: {
    type: Number,
    default: 10
  },

  description: {
    type: String,
    maxlength: 100,
    default: ""
  },

  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  }

}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
