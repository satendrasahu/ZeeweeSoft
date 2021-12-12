const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
require("./Db/Conn")
const ProductRouter = require("./Routers/ProductRouter")
const CartRouter = require("./Routers/CartRouter")
const AuthRouter = require('./Routers/AuthRouter')
const OrderRouter = require('./Routers/OrderRouter')
const CategoryRouter = require('./Routers/CategoryRouter')
const cors = require('cors');
const { json } = require('express');
const app = express();
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())
app.use('/api', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/auth', AuthRouter)
app.use('/api/order', OrderRouter)
app.use('/api/category', CategoryRouter)
app.listen(port, () => {
    console.log(`connection is successfull at port ${port}`);
})