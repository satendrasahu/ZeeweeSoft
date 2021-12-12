const mongoose = require('mongoose')
const itemCategorySchema = mongoose.Schema({

    item_category_id: {
        type: String
    },
    item_category_name: {
        type: String,
        require: true,
        trim: true
    },
}, { timestamps: true })




const ItemCategory = mongoose.model("item_Category", itemCategorySchema);

module.exports = ItemCategory