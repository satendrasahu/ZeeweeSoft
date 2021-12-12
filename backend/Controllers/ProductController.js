const chalk = require('chalk');
const Products = require('../Models/ProductModel');

const saveProduct = async(req, res) => {
    var title = req.body.title;
    var price = req.body.price;
    var size = req.body.size;
    var discount = req.body.discount;
    var category = req.body.category;
    var image = req.body.image

    // console.log(req.file.path)
    // console.log(req.file)
    // console.log(req.file.filename)
    if (!title || !price || !size || !discount || !image) {
        return res.status(422).json({ Error: `Please filled required field` })
    }

    try {

        const ProductData = new Products({

            title,
            price,
            size,
            discount,
            category,
            discountedPrice: price * (1 - (discount / 100)),
            image
        })
        const result = await ProductData.save();
        if (result) {
            console.log(chalk.green.inverse("Product save successfully"))
            res.json({
                Success: "Product save Success fully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Products Not save"))
            res.json({
                Error: "Product not save Success fully ",
                result
            })
        }

    } catch (Error) {
        res.json({
            Error: "Product did not Save Successfully",
        })
        console.error(chalk.red.inverse(Error));
    }
}

const getProduct = async(req, res) => {
    // console.log("Get Data from Customerlogs");
    try {
        const data = await Products.find()

        if (data) {
            console.log(chalk.green.inverse(`product data find successfully`))
            res.json({
                Success: "product Data find successfully",
                length: data.length,
                data
            })
        }


    } catch (err) {
        // console.error(err)
        console.log(chalk.redBright(`product data din't find successfully`, err.message))
        res.status(404).json({ Error: 'product not found' })
    }
}

const getProductsByName = async(req, res) => {
    console.log(req.params.title)
    try {
        const data = await Products.find({ title: { $regex: "^" + req.params.title } })

        if (data) {
            console.log(chalk.green.inverse(`product data find successfully By Name`))
            res.json({
                Success: "product Data find successfully By Name",
                length: data.length,
                data
            })
        }


    } catch (err) {
        // console.error(err)
        console.log(chalk.greenBright(`product data din't find successfully By Name`, err.message))
        const data = await Products.find({ title: req.params.title })

        if (data) {
            console.log(chalk.green.inverse(`product data find successfully By Name`))
            res.json({
                Success: "product Data find successfully By Name",
                length: data.length,
                data
            })
        }
    }
}


const updateProductById = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await Products.findByIdAndUpdate(_id, req.body, { new: true })
        if (result) {
            console.log(chalk.green.inverse("product update successfully"))
            res.status(200).send({
                Success: "Product update Success fully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product not updated"))
            res.json({
                Error: "Product not update Success fully ",

            })
        }
    } catch (Error) {
        res.json({
            Error: "updated Product did not Save Successfully",

        })
        console.error(chalk.red.inverse(Error));
    }
}
const deleteProductByid = async(req, res) => {
    try {
        const _id = req.params.id;
        const result = await Products.findByIdAndDelete(_id)
        if (result) {
            console.log(chalk.green.inverse("Product Deleted successfully"))
            res.status(200).send({
                Success: "Product deleted Successfully ",
                result
            })
        } else {
            console.error(chalk.red.inverse("Product not delete"))
            res.json({
                Error: "Product not delete",

            })
        }
    } catch (Error) {
        res.status(500).send({
            Error: "product not delete",

        })
        console.error(chalk.red.inverse(Error));
    }
}

module.exports = { getProduct, saveProduct, updateProductById, deleteProductByid, getProductsByName }