const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const port = process.env.PORT || 5000
const cookieParser = require("cookie-parser");
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
//const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? ["https://spaceshipacc.herokuapp.com", "http://localhost:3000"] : '*'
}

app.use(cors({credentials:true, origin}))
app.use(compression())
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders',orderRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})