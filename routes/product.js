const Product = require("../models/Product");


//CREATE
const createProduct = async (req, res)=> {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        return res.send(500).json(error);
    }
};


module.exports = {
    createProduct
}


