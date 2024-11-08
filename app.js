const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderModel = require("./order-model");

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());

app.get("/order", async (req, res) => {
  try {
    const searchOrder = await orderModel.find();
    return res.status(400).json({
      message: "Order not found",
      data: searchOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error trying to find order. Error: ${error}`,
    });
  }
});

app.get("/order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const OrderId = await orderModel.findById(id);
    if (!OrderId) {
      return res.status(400).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      message: "Your order has been returned",
      data: OrderId,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Something in the operation went wrong: ${error}`,
    });
  }
});
app.post("/order", async (req, res) => {
  const data = req.body;
  try {
    const newOrder = await orderModel.create(data);
    return res.status(200).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error creating new order. Error: ${error}`,
    });
  }
});

// Conectando com o MongoDB us  ando o mongoose
app.listen(port, () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connected successfully. Running on port: http://localhost:${port}`
    );
  } catch (error) {
    console.error("Something went wrong with the connection. Error: ", error);
  }
});
