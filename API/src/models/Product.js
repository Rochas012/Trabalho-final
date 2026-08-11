import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nome do produto é obrigatório"],
    trim: true,
  },
  sku: {
    type: String,
    required: [true, "SKU é obrigatório"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  priceCost: {
    type: Number,
    required: true,
    min: 0,
  },
  priceSale: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  minStock: {
    type: Number,
    default: 5,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Product", productSchema);