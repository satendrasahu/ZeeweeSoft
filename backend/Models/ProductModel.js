const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // unique: [true, "Product title is alrady present"] 
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    discountedPrice: {
        type: Number,
        required: true,
        default: 0
    },

    image: { type: String }
}, {
    timestamps: true
})

// create a new collection for product

const Products = new mongoose.model('Product', productSchema);

module.exports = Products;