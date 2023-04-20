const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Products = require("../model/productModel");
const Apifeature = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary=require("cloudinary")
class productController {

    static createProduct = catchAsyncErrors(async (req, res, next) => {



        let images = [];
        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }
        const imagesLinks = [];
      
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
        req.body.images = imagesLinks;
  
       
        req.body.user = req.user.id
        // creating product
        const product = await Products.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    })
    // get all products
    static getAllproduct = catchAsyncErrors(async (req, res) => {
     
        const resultperpage = 3;
        const productsCount = await Products.countDocuments();
       
        const apiFeature = new Apifeature(Products.find(), req.query).search().filter().pagination(resultperpage)
   
        const products = await apiFeature.query
        res.status(201).json({
            success: true,
            products,
            productsCount,
            resultperpage
        })
    })
    // update product
    static updateProduct = catchAsyncErrors(async (req, res) => {
        let product = await Products.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("product not found", 404))
        }
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

     
        product = await Products.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            product
        })

    })

    static deleteProduct = catchAsyncErrors(async (req, res, next) => {
        let product = await Products.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("product not found", 404))
        }

        else {
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
            await product.deleteOne();
            res.status(200).json({
                success: true,
                message: "product Deleted successfully"
            })
        }
    }
    )
    static getproductDetails = catchAsyncErrors(async (req, res, next) => {
        let product = await Products.findById(req.params.id)
        if (!product) {
            return next(new ErrorHandler("product not found", 404))
        }
        res.status(200).json({
            success: true,
            product
        })

    })

   
static getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Products.find();
  
    res.status(200).json({
      success: true,
      products,
    });
  });
}
module.exports = productController