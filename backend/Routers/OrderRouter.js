const express = require('express');
const { saveOrder, findOrder, findOrderByUserID, orderDelete, findOrderByUserIDAndUpdateStatus, findConfirmOrder, findConfirmOrderForAdmin } = require('../Controllers/OrderCotroller');
const router = express.Router()

router.post("/order", saveOrder);
router.get("/order", findOrder);
router.get("/order/confirm", findConfirmOrderForAdmin);
router.get("/order/confirm/:userId", findConfirmOrder);
router.get("/order/:userId", findOrderByUserID);
router.patch("/order/status/:id", findOrderByUserIDAndUpdateStatus);
router.delete("/order", orderDelete);
module.exports = router