const express=require("express")
const app=express()
const cookieparser=require("cookie-parser")
const bodyParser=require("body-parser")
const fileUpload=require("express-fileupload")
const product=require("./routers/productRoutes")
const user=require("./routers/userRoutes")
const order=require("./routers/orderRoutes")
const payment=require("./routers/paymentRoute")
const errormiddleware=require("./middleware/error")
const dotenv=require("dotenv")
dotenv.config({path:"config/config.env"})

app.use(cookieparser())
app.use(express.json({limit:"50mb"}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use("/api/v1",product)
app.use("/api/v1",user)
app.use("/api/v1",order)
app.use("/api/v1",payment)
app.use(errormiddleware)

module.exports=app