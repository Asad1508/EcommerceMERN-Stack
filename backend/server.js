const app=require('./app')

const dotenv=require("dotenv")
const Connectdbs = require('./config/db')
const cloudinary=require("cloudinary")
dotenv.config({path:"config/config.env"})
Connectdbs()
// setting cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at PORT ${process.env.PORT}`)
})
