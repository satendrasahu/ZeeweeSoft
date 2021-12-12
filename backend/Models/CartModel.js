const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
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
    productId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    qty: {
        type: Number,
        required: true,
        default: 1
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
    userId: { type: String },
    image: { type: String }
}, {
    timestamps: true
})

// create a new collection for product

const CartModel = new mongoose.model('Cart', cartSchema);

module.exports = CartModel;