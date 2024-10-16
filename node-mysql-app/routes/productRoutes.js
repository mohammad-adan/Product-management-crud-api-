const express = require('express');
const { getProduct, getProductByID, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

//router object
const router = express.Router();

//routes

//Get all products
router.get('/getall', getProduct);
//get product by id
router.get('/get/:id', getProductByID);

//create product || post

router.post('/create', createProduct);

router.put('/update/:id',updateProduct);

router.delete('/delete/:id',deleteProduct);
module.exports = router