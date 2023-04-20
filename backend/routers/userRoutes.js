const express=require("express")
const UserController = require("../controllers/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/AuthenticatedUser")
const route=express.Router()

route.post("/register",UserController.register)
route.post("/login",UserController.loginUser)
route.get("/logout",UserController.logout)
route.post("/password/forgot",UserController.forgotPassword)
route.put("/password/reset/:token",UserController.resetPassword)

route.get("/me",isAuthenticatedUser,UserController.getUserDetails)
route.put("/password/update",isAuthenticatedUser,UserController.updatePassword)
route.put("/me/update",isAuthenticatedUser,UserController.updateProfile)
route.get("/admin/allusers",isAuthenticatedUser,authorizeRoles("admin"),UserController.getAllUser)
route.get("/admin/singleuser/:id",isAuthenticatedUser,authorizeRoles("admin"),UserController.getsingleUser)

// update user role admin/user
route.put("/admin/updaterole/:id",isAuthenticatedUser,authorizeRoles("admin"),UserController.updateUserRole)

route.delete("/admin/deleteuser/:id",isAuthenticatedUser,authorizeRoles("admin"),UserController.deleteUser)



module.exports=route