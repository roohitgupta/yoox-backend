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

//UPDATE
const updateProduct = async (req, res)=> {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
};


//DELETE
const deleteProduct = async (req, res)=> {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted..!!")
    } catch (error) {
        return res.status(500).json(error);
    }
};

//GET PRODUCT
const getProduct = async (req, res)=> {
    try {
        const getsProductbyId = await Product.findById(req.params.id);
        return res.status(200).json(getsProductbyId);
    } catch (error) {
        return res.status(500).json(error)
    }
};


module.exports = {
    createProduct, updateProduct, deleteProduct, getProduct
}


