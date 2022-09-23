const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const port = process.env.PORT || 5000
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})