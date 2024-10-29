const { Schema, default: mongoose } = require("mongoose");

const orderSchema = new Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    cep: Number,
    street: String,
  },
  clientStatus: {
    type: String,
    default: "OPEN",
  },
  paymentMethod: {
    payment: ["CREDIT", "DEBIT", "TICKET"],
    type: String,
  },
  orderDate: Date,
  clientName: String,
  clientEmail: String,
  shippingValue: Number,
  items: [
    {
      itemID: Number,
      itemDescription: String,
      itemValue: Number,
      itemQuantity: Number,
      discount: Number,
    },
  ],
});

module.exports = mongoose.model("orders", orderSchema);
