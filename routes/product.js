const express = require('express');
const { getProducts ,newProduct, getSingleProduct, updateProduct, deleteProduct,searchAndPaginateProducts} = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct)
router.route('/product/search').get(searchAndPaginateProducts)


module.exports = router;      

