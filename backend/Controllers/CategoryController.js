const ItemCategory = require("../Models/CategoryModel");

const moment = require('moment');
const chalk = require("chalk");
const CurrentYear = moment().format('YYYY');
const saveItemCategory = async(req, res) => {
    const { item_category_name } = req.body;
    const ItemCategoryResult = await ItemCategory.find();
    const serialId = await ItemCategoryResult.length + 1
    const item_category_id = `ITMCAT${
        Date.now()
    }-${CurrentYear}-${serialId}`
    try {
        const saveItemData = new ItemCategory({ item_category_id, item_category_name })
        const result = await saveItemData.save();
        if (result) {
            console.log(chalk.green.inverse(`Item Category Data Save Sucessfully`, ))
            res.json({ Success: `Item Category Data Save Sucessfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.red.inverse(`Item Category Data Didn't Save Sucessfully`), chalk.redBright(err.message))
        res.json({ Success: `Item Category Data Didn't Save Sucessfully`, data: [] })
    }
}
const findItemCategory = async(req, res) => {
    try {
        const result = await ItemCategory.find();
        if (result) {
            console.log(chalk.green.inverse(`Item Category Data Find Sucessfully`, ))
            res.json({ Success: `Item Category Data Find Sucessfully`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.red.inverse(`Item Category Data Didn't Find Sucessfully`), chalk.redBright(err.message))
        res.json({ Success: `Item Category Data Didn't Find Sucessfully`, data: [] })
    }
}
const findItemCategoryByName = async(req, res) => {
    try {
        const result = await ItemCategory.find({ item_category_name: req.params.name });
        if (result) {
            console.log(chalk.green.inverse(`Item Category Data Find Sucessfully By Name`, ))
            res.json({ Success: `Item Category Data Find Sucessfully By Name`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.red.inverse(`Item Category Data Didn't Find Sucessfully By Name`), chalk.redBright(err.message))
        res.json({ Success: `Item Category Data Didn't Find Sucessfully By Name`, data: [] })
    }
}
const updateItemCategory = async(req, res) => {
    try {
        const result = await ItemCategory.findByIdAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false, new: true });
        if (result) {
            console.log(chalk.green.inverse(`Item Category Data Update Sucessfully By Id`, ))
            res.json({ Success: `Item Category Data Update Sucessfully By Id`, length: result.length, data: result })
        }
    } catch (err) {
        console.log(chalk.red.inverse(`Item Category Data Didn't Update Sucessfully By Id`), chalk.redBright(err.message))
        res.json({ Success: `Item Category Data Didn't Update Sucessfully By Id`, data: [] })
    }
}

module.exports = {
    saveItemCategory,
    findItemCategory,
    findItemCategoryByName,
    updateItemCategory
}