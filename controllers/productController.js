const Product = require('../models/productModel.js');
const asyncHandler = require('express-async-handler');

//get all products
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200);
        res.json(products);
    }
    catch (error) {
        res.status(500);
        throw new Error({ message: error.message });
    }
})

//get a single product 
const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findById(id);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500);
        throw new Error({ message: error.message });
    }
})

//create a product 
const createProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.create(req.body);
        res.status(200);
        res.json(products);
    }
    catch (error) {
        res.status(500);
        throw new Error({ message: error.message });
    }
})

//update a product 
const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findByIdAndUpdate(id, req.body);
        if (!products) {
            res.status(404);
            throw new Error({ message: `cannot find any product with ID" ${id}` });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500);
        throw new Error({ message: error.message });
    }
})

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.findByIdAndDelete(id);
        if (!products) {
            res.status(404);
            throw new Error({ message: `cannot find any product with ID" ${id}` });
        }
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500);
        throw new Error({ message: error.message });
    }
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}