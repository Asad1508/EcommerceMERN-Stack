const express=require("express")
const Ordercontroller=require("../controllers/orderController")
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/AuthenticatedUser")
const route=express.Router()

route.post("/order/new",isAuthenticatedUser,Ordercontroller.newOrder)
// get single order admin
route.get("/order/:id",isAuthenticatedUser,Ordercontroller.getSingleOrder)
route.get("/orders/me",isAuthenticatedUser,Ordercontroller.myOrders)

route.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),Ordercontroller.getAllOrders)

route.put("/admin/updateorder/:id",isAuthenticatedUser,authorizeRoles("admin"),Ordercontroller.updateOrder)

route.delete("/admin/deleteorder/:id",isAuthenticatedUser,authorizeRoles("admin"),Ordercontroller.deleteOrder)


module.exports=route
