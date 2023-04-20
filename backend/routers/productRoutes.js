const express=require("express")
const productController = require("../controllers/productController")
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/AuthenticatedUser")
const route=express.Router()


route.get('/products',productController.getAllproduct)
route.post('/admin/products/new',isAuthenticatedUser,authorizeRoles("admin"),productController.createProduct)
route.put('/admin/products/:id',isAuthenticatedUser,authorizeRoles("admin"),productController.updateProduct)
route.delete('/admin/productdlt/:id',isAuthenticatedUser,authorizeRoles("admin"),productController.deleteProduct)
route.get('/productsingledetail/:id',productController.getproductDetails)

route.get('/admin/products',isAuthenticatedUser,authorizeRoles("admin"),productController.getAdminProducts);

module.exports=route
