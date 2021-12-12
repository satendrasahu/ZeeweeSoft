const chalk = require('chalk');
const CartModel = require('../Models/CartModel');


const findCartByProductName = async(req, res) => {
    console.log(req.params.name)
    try {
        const title = req.params.name;
        const result = await CartModel.find({ title })

        if (result) {
            console.log(chalk.green.inverse("Product find By Name successfully"))
            res.status(200).send({
                Success: "Product find successfully by Name",
                length: result.length,
                result
            })
        }
    } catch (Error) {
        console.log(chalk.redBright("Product didn't find By Name successfully", Error.message))
        res.status(200).send({
            Success: "Product didn't find successfully by Name",
            result: []
        })
    }
}

const saveCart = async(req, res) => {
    var title = req.body.title;
    var price = req.body.price;
    var totalPrice = req.body.totalPrice;
    var qty = req.body.size;
    var discount = req.body.discount;
    var userId = req.body.userId
    var image = req.body.image;
    var productId = req.body.productId


    try {
        const ProductData = new CartModel({
            title,
            price,
            productId,
            totalPrice,
            qty,
            userId,
            discount,
            discountedPrice: price * (1 - (discount / 100)),
            image
        })

        const result = await ProductData.save();
        if (result) {
            console.log(chalk.green.inverse("Product save in cart"))
            res.json({
                Success: "Product save in cart ",
                result
            })
        } else {
            console.error(chalk.red.inverse("cart not save"))
            res.json({
                Error: "cart not save ",
                result
            })
        }

    } catch (Error) {
        res.json({
            Error: "cart not save",
        })
        console.error(chalk.red.inverse(Error));
    }
}
const getCart = async(req, res) => {
    try {
        const data = await CartModel.find({})

        if (data) {
            console.log(chalk.green.inverse("Cart data find Successfully"))
            res.json({
                Success: "Cart data find Successfully",
                length: data.length,
                data
            })
        }
    } catch (err) {
        console.log(chalk.redBright("Cart data did notfind Successfully"))
        res.json({
            Success: "Cart data didn't find Successfully",
            data: []
        })
    }
}
const updateCartProductById = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await CartModel.findByIdAndUpdate(_id, req.body, { new: true })
        if (result) {
            console.log(chalk.green.inverse("updated Cart Product find successfully"))
            res.status(200).send({
                Success: " cart Product save Success fully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("cart Product not updated"))
            res.json({
                Error: "cart Product not update Success fully ",
            })
        }
    } catch (Error) {
        res.json({
            Error: "updated cart Product did not Save Successfully",
        })
        console.error(chalk.red.inverse(Error));
    }
}
const deleteProductByid = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await CartModel.findByIdAndDelete(_id)
        if (result) {
            console.log(chalk.green.inverse("Product Cart Deleted successfully"))
            res.status(200).send({
                Success: "Product Cart deleted Successfully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product Cart not delete"))
            res.json({
                Error: "Product Cart not delete",
            })
        }
    } catch (Error) {
        res.status(500).send({
            Error: "product Cart not delete",

        })
        console.error(chalk.red.inverse(Error));
    }
}
const deleteProductByUserId = async(req, res) => {
    // console.log(req.params.userId)
    try {
        const userId = req.params.userId;
        const result = await CartModel.deleteMany({ userId: req.params.userId })
        if (result) {
            console.log(chalk.green.inverse("Product Cart Deleted successfully"))
            res.status(200).send({
                Success: "Product Cart deleted Successfully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product Cart not delete"))
            res.json({
                Error: "Product Cart not delete",
            })
        }
    } catch (Error) {
        res.status(500).send({
            Error: "product Cart not delete",

        })
        console.error(chalk.red.inverse(Error));
    }
}
const findCartByProductId = async(req, res) => {
    try {
        const _id = req.params.productId;
        const result = await CartModel.find({ productId: _id }, (err, data) => {
            if (data) {
                console.log(chalk.green.inverse("Product id matched successfully", data))
            }
        })
        if (result) {
            // console.log(chalk.green.inverse("Product id matched successfully"))
            res.status(200).send({
                Success: "Product id match Successfully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product id not match"))
            res.json({
                Error: "Product id not match",
            })
        }
    } catch (Error) {
        res.status(500).send({
            Error: "product productid not match",
        })
        console.error(chalk.red.inverse(Error));
    }
}

module.exports = { getCart, saveCart, updateCartProductById, findCartByProductName, deleteProductByid, findCartByProductId, deleteProductByUserId }