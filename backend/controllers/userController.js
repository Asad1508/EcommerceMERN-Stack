const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorhandler");
const UserModel = require("../model/userModel")
const sendToken = require("../utils/jwToken")
const sendEmail = require("../utils/sendEmail")
const cloudinary=require("cloudinary")
const crypto = require("crypto")
class UserController {
    static register = catchAsyncErrors(async (req, res) => {
        // settting avatar
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
        const { name, email, password } = req.body
        const user = await UserModel.create({
            name: name, email: email, password: password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },
        })
        sendToken(user, 201, res);
        // const token=await user.getJWTToken()
        // res.status(201).json({
        //     success:true,
        //     token,
        // })
    })

    static loginUser = catchAsyncErrors(async (req, res, next) => {
        const { email, password } = req.body;


        if (!email || !password) {
            return next(new ErrorHandler("Please Enter Email & Password", 400));
        }
    
        const user = await UserModel.findOne({ email }).select("+password");

        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
   
        const isPasswordMatched = await user.comparePassword(password);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }
  
        sendToken(user, 200, res);
        // sendtoken() wala same neechy waly ki trh lakin short krdia sprate kr k
        // const token=await user.getJWTToken()
        // res.status(201).json({
        //     success:true,
        //     token,
        // })

    })
    // Logout User
    static logout = catchAsyncErrors(async (req, res, next) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Logged Out",
        });
    });

    //forgot  password
    static forgotPassword = catchAsyncErrors(async (req, res, next) => {
   
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

     
        const resetToken = user.getResetPasswordToken();
      
        await user.save({ validateBeforeSave: false });
      
        const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

        const message = `Your password reset token is ttemp:- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

        try {
         
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery`,
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email} successfully`,
            });
        } catch (error) {
           
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return next(new ErrorHandler(error.message, 500));
        }
    })

    static resetPassword = catchAsyncErrors(async (req, res, next) => {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");
        const user = await UserModel.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(
                new ErrorHandler(
                    "Reset Password Token is invalid or has been expired",
                    400
                )
            );
        }
        if (req.body.password !== req.body.confirmPassword) {
            return next(new ErrorHandler("Password does not password", 400));
        }
        
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res);
    });


    static getUserDetails = catchAsyncErrors(async (req, res, next) => {
        
        const user = await UserModel.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });
    });
    // update User password
    static updatePassword = catchAsyncErrors(async (req, res, next) => {

        const user = await UserModel.findById(req.user.id).select("+password");
      
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old password is incorrect", 400));
        }
        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHandler("password does not match", 400));
        }
        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);
    });

    // update User Profile

    static updateProfile = catchAsyncErrors(async (req, res, next) => {
   
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
        };
        if (req.body.avatar !== "") {
            const user = await UserModel.findById(req.user.id);
            const imageId = user.avatar.public_id;
    
            await cloudinary.v2.uploader.destroy(imageId);
                 // settting avatar
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
          });
            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              };
            }
        
        const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
        
    });

    static getAllUser = catchAsyncErrors(async (req, res, next) => {
        const users = await UserModel.find();

        res.status(200).json({
            success: true,
            users,
        });
    });

    static getsingleUser = catchAsyncErrors(async (req, res, next) => {
        const user = await UserModel.findById(req.params.id);
        console.log(user)
        if (!user) {
            return next(
                new ErrorHandler(`User Doesnot Exist with ID: ${req.params.id}`)
            );
        }
        res.status(200).json({
            success: true,
            user,
        });
    });


    static updateUserRole = catchAsyncErrors(async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };
    
        await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
    });
    // Delete User --Admin
    static deleteUser = catchAsyncErrors(async (req, res, next) => {
        let user = await UserModel.findById(req.params.id);

        if (!user) {
            return next(
                new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
            );
        }
        
      

        else {
            const imageId = user.avatar.public_id;

            await cloudinary.v2.uploader.destroy(imageId);
            await user.deleteOne()
            res.status(200).json({
                success: true,
                message: "User Deleted Successfully",
            });
        }


    });



}

module.exports = UserController