const express = require('express');
const { saveItemCategory, findItemCategory, findItemCategoryByName, updateItemCategory } = require('../Controllers/CategoryController');
const router = express.Router()

router.post('/category', saveItemCategory)
router.get('/category', findItemCategory)
router.get('/category/:name', findItemCategoryByName)
router.patch('/category/:id', updateItemCategory)

module.exports = router