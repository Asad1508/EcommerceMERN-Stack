const Order=require("../model/orderModel");
const ErrorHandler = require("../utils/errorhandler");
const Product=require("../model/productModel")
const catchAsyncError=require("../middleware/catchAsyncErrors")
class Ordercontroller{

// Create new Order
static newOrder = catchAsyncError(async (req, res, next) => {
    //destructuring object
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    
    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id
      
    });
    
    res.status(201).json({
      success: true,
      order,
    });
  });

  // get Single Order
static getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
  
    res.status(200).json({
      success: true,
      order,
    });
  });

  
  // get logged in user  Orders
  static myOrders = catchAsyncError(async (req, res, next) => {
 
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
 
});

  // get all Orders -- Admin
  static getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();
  
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  });

  // update Order Status -- Admin  
  static updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }
    if (order.orderStatus === "Delivered") {
      return next(new ErrorHandler("You have already delivered this order", 400));
    }
  
   
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
  
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
// delete Order -- Admin
static deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }
else{
  await Order.deleteOne();
  res.status(200).json({
    success: true,
  });
}

 
});
}



async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  // console.log(product)
  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}
module.exports=Ordercontroller