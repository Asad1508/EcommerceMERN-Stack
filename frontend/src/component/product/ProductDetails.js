import React, { Fragment, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
import {useSelector,useDispatch} from 'react-redux';
import { getProductDetails } from "../../actions/productActions";
import reactStars from "react-rating-stars-component";
import {useParams} from 'react-router-dom'
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../Loader";
import Metadata from "../layout/metaData";
import {addItemsToCart} from '../../actions/cartActions'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css'

const ProductDetails = () => {

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
    const dispatch=useDispatch()
    const {id}=useParams()


   const options={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    size:window.innerWidth <600 ? 20:25,
    value:product.ratings,
    isHalf:true,
  };
  const [quantity, setQuantity] = useState(1);
  const increasequantity = () => {
  
        if (product.stock <= quantity) 
        return;
        const qty = quantity + 1;
        setQuantity(qty);
      };
    
      const decreasequantity = () => {
        if (1 >= quantity) return;
    
        const qty = quantity - 1;
        setQuantity(qty);
      };
  const addToCartHandler=()=>{
    dispatch(addItemsToCart(id,quantity));
    toast.success("Items added to cart Successfully")
  }
      useEffect(()=>{
        if(error){
          toast.error(error);
        }
         dispatch(getProductDetails(id));
         }, [dispatch, id,toast,error]);    
  return (
    <Fragment>
     {loading ? <Loader/> : (
    <Fragment>
      <Metadata title={`${product.name} ---Ecommerce`}/>
    <div className="ProductDetails">
    <div>
      {/* <Carousel> */}
      {/* <Swiper
       spaceBetween={50}
       slidesPerView={1}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper"
  
    > */}
        {product.images &&
          product.images.map((item, i) => (
            <SwiperSlide><img
              className="CarouselImage"
              key={i}
              src={item.url}
              alt={`${i} Slide`}
            /></SwiperSlide>
          ))}
          {/* </Swiper> */}
      {/* </Carousel> */}
    </div> 
    <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.Price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreasequantity}>-</button>
                       <h5>{quantity}</h5> 
                    <button onClick={increasequantity} >+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                   onClick={addToCartHandler} 
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">
                Submit Review
              </button>
    </div>  
    </div>  
    <h3 className="reviewsHeading">REVIEWS</h3>
    {product.reviews && product.reviews[0] ? (
      <div className="reviews">
        {product.reviews &&
          product.reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
      </div>
    ) : (
      <p className="noReviews">No Reviews Yet</p>
    )}
    <ToastContainer/>
    </Fragment> 
)}

    </Fragment>
    );
};

export default ProductDetails




// import React, { Fragment, useEffect, useState } from "react";
// import Carousel from "react-material-ui-carousel";
// import "./ProductDetails.css";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getProductDetails,
//   newReview,
// } from "../../actions/productAction";
// import ReviewCard from "./ReviewCard.js";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
// import MetaData from "../layout/MetaData";
// import { addItemsToCart } from "../../actions/cartAction";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
// import { NEW_REVIEW_RESET } from "../../constants/productConstants";

// const ProductDetails = ({ match }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { product, loading, error } = useSelector(
//     (state) => state.productDetails
//   );

//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

//   const options = {
//     size: "large",
//     value: product.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };

//   const [quantity, setQuantity] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const increaseQuantity = () => {
//     if (product.Stock <= quantity) return;

//     const qty = quantity + 1;
//     setQuantity(qty);
//   };

//   const decreaseQuantity = () => {
//     if (1 >= quantity) return;

//     const qty = quantity - 1;
//     setQuantity(qty);
//   };

//   const addToCartHandler = () => {
//     dispatch(addItemsToCart(match.params.id, quantity));
//     alert.success("Item Added To Cart");
//   };

//   const submitReviewToggle = () => {
//     open ? setOpen(false) : setOpen(true);
//   };

//   const reviewSubmitHandler = () => {
//     const myForm = new FormData();

//     myForm.set("rating", rating);
//     myForm.set("comment", comment);
//     myForm.set("productId", match.params.id);

//     dispatch(newReview(myForm));

//     setOpen(false);
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (reviewError) {
//       alert.error(reviewError);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Review Submitted Successfully");
//       dispatch({ type: NEW_REVIEW_RESET });
//     }
//     dispatch(getProductDetails(match.params.id));
//   }, [dispatch, match.params.id, error, alert, reviewError, success]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={`${product.name} -- ECOMMERCE`} />
//           <div className="ProductDetails">
//             <div>
//               <Carousel>
//                 {product.images &&
//                   product.images.map((item, i) => (
//                     <img
//                       className="CarouselImage"
//                       key={i}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousel>
//             </div>

//             <div>
//               <div className="detailsBlock-1">
//                 <h2>{product.name}</h2>
//                 <p>Product # {product._id}</p>
//               </div>
//               <div className="detailsBlock-2">
//                 <Rating {...options} />
//                 <span className="detailsBlock-2-span">
//                   {" "}
//                   ({product.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <div className="detailsBlock-3">
//                 <h1>{`₹${product.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={decreaseQuantity}>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={increaseQuantity}>+</button>
//                   </div>
//                   <button
//                     disabled={product.Stock < 1 ? true : false}
//                     onClick={addToCartHandler}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
//                     {product.Stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{product.description}</p>
//               </div>

//               <button onClick={submitReviewToggle} className="submitReview">
//                 Submit Review
//               </button>
//             </div>
//           </div>

//           <h3 className="reviewsHeading">REVIEWS</h3>

//           <Dialog
//             aria-labelledby="simple-dialog-title"
//             open={open}
//             onClose={submitReviewToggle}
//           >
//             <DialogTitle>Submit Review</DialogTitle>
//             <DialogContent className="submitDialog">
//               <Rating
//                 onChange={(e) => setRating(e.target.value)}
//                 value={rating}
//                 size="large"
//               />

//               <textarea
//                 className="submitDialogTextArea"
//                 cols="30"
//                 rows="5"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={submitReviewToggle} color="secondary">
//                 Cancel
//               </Button>
//               <Button onClick={reviewSubmitHandler} color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {product.reviews && product.reviews[0] ? (
//             <div className="reviews">
//               {product.reviews &&
//                 product.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default ProductDetails;
