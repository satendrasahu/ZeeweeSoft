const mongoose = require('mongoose')

const moment = require('moment')
const date = moment().format('MM-DD-YYYY');
const orderSchema = new mongoose.Schema({

    items: [{
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
        total: { type: Number, default: 0 },

        image: { type: String },
        date: { type: String, default: date },
    }],

    date: { type: String, default: date },
    userId: { type: String },
    status: { type: String, enum: ["Temp", "Confirm", "Cancel", "Return"], default: "Temp" }

})

const Order = new mongoose.model("order", orderSchema);
module.exports = Order