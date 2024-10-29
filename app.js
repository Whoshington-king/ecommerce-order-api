const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderModel = require("./order-model");
const statusHttp = require("./status-http");

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());

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

// Conectando com o MongoDB usando o mongoose
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
