import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ["dinheiro", "pix", "cartao_credito", "cartao_debito"],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["finalizada", "cancelada"],
    default: "finalizada"
  }
}, {
  timestamps: true
});

export default mongoose.model("Sale", saleSchema);