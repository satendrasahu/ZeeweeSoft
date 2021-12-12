const chalk = require("chalk")
const Order = require("../Models/OrderModel")

const saveOrder = async(req, res) => { // console.log(req.body)
    const { items, userId } = req.body
    try { // items.map((data, val)=>{})
        const OrderData = new Order({ items, userId })
        const result = await OrderData.save()
        if (result) {
            console.log(chalk.green.inverse(`order created successfully`)),
                res.json({ Success: `order created Successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`order didn't create`)),
            res.json({ Success: `order didn't create`, data: [] })
    }


}

const findOrder = async(req, res) => {

    try {
        const result = await Order.find()
        if (result) {
            console.log(chalk.green.inverse(`order find successfully`)),
                res.json({ Success: `order find Successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`order didn't find`)),
            res.json({ Success: `order didn't find`, data: [] })
    }

}
const findConfirmOrder = async(req, res) => {

    try {
        const result = await Order.find({ status: "Confirm", userId: req.params.userId })
        if (result) {
            console.log(chalk.green.inverse(`confirm order find successfully`)),
                res.json({ Success: `confirm order find Successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`confirm order didn't find`)),
            res.json({ Success: `confirm order didn't find`, data: [] })
    }

}
const findConfirmOrderForAdmin = async(req, res) => {

    try {
        const result = await Order.find({ status: "Confirm" })
        if (result) {
            console.log(chalk.green.inverse(`confirm order find successfully for admin`)),
                res.json({ Success: `confirm order find successfully for admin`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`confirm order didn't find for admin`)),
            res.json({ Success: `confirm order didn't find for admin`, data: [] })
    }

}

const findOrderByUserID = async(req, res) => {
    userId = req.params.userId
    try {
        const result = await Order.find({ userId, status: "Temp" })
        if (result) {
            console.log(chalk.green.inverse(`order find by User Id successfully`)),
                res.json({ Success: `order find by User Id Successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`order didn't find by User Id`)),
            res.json({ Success: `order didn't find by User Id`, data: [] })
    }

}

const findOrderByUserIDAndUpdateStatus = async(req, res) => {
    // console.log(req.params.id)
    try {
        const result = await Order.findByIdAndUpdate({ _id: req.params.id }, { status: "Confirm" }, {
            useFindAndModify: false,
            new: true
        })
        if (result) {
            console.log(chalk.green.inverse(`order update by User Id successfully`)),
                res.json({ Success: `order update by User Id Successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`order didn't update by User Id`), err.message),
            res.json({ Success: `order didn't update by User Id`, data: [] })
    }

}

const orderDelete = async(req, res) => {
    try {
        const result = await Order.deleteMany({ status: "Temp" })
        if (result) {
            console.log(chalk.green.inverse(`order delete by User Id successfully`)),
                res.json({ Success: `order delete by User Id Successfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.redBright(`order didn't delete by User Id`), err.message),
            res.json({ Success: `order didn't delete by User Id`, data: [] })
    }

}

module.exports = {
    saveOrder,
    findOrder,
    findOrderByUserID,
    orderDelete,
    findConfirmOrder,
    findConfirmOrderForAdmin,
    findOrderByUserIDAndUpdateStatus
}