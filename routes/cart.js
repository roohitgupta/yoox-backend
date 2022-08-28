const Cart = require("../models/Cart");

//CREATE
const createCart = async (req, res) => {
  const newProduct = new Cart(req.body);

  try {
    const savedCart = await newProduct.save();
    res.status(200).json(savedCart);
  } catch (error) {
    return res.send(500).json(error);
  }
};

//UPDATE
const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DELETE
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted..!!");
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET CART
const getCart = async (req, res) => {
  try {
    const getsCartbyId = await Cart.findById(req.params.id);
    return res.status(200).json(getsCartbyId);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//GET ALL PRODUCTS
const getAllCart = async (req, res)=> {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = {
  createCart,
  updateCart,
  deleteCart,
  getCart,
  getAllCart
};
