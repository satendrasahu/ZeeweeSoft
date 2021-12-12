const express = require('express');

const router = new express.Router();
const { saveCart, getCart, deleteProductByid, updateCartProductById, findCartByProductId, deleteProductByUserId, findCartByProductName } = require('../Controllers/CartController');
router.post('/cart', saveCart)
router.get('/cart', getCart)
router.get('/cart/:name', findCartByProductName)
router.put('/cart/:productId', findCartByProductId)
router.patch('/cart/:id', updateCartProductById)
router.delete('/cart/:id', deleteProductByid)
router.delete('/cart/confirm/:userId', deleteProductByUserId)


module.exports = router