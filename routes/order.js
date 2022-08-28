const Order = require("../models/Order");

//CREATE
const createOrder = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    return res.send(500).json(error);
  }
};

//UPDATE
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DELETE
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted..!!");
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET USER ORDER
const getOrder = async (req, res) => {
  try {
    const getsOrderbyId = await Order.findById({ userId: req.params.userId });
    return res.status(200).json(getsOrderbyId);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET ALL ORDERS
const getAllOrder = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
};





module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAllOrder
};
