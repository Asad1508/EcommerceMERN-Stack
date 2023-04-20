import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import {useParams} from 'react-router-dom'
import Loader from "../Loader";
import ProductCard from "../layout/Home/productCard";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
// import { useAlert } from "react-alert";
import Typography from '@mui/material/Typography';

import MetaData from "../layout/metaData";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const {keyword}=useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [Price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    product,
    loading,
    error,
    productsCount,
    resultperpage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo=(e)=>{
     setCurrentPage(e)
  }
  const priceHandler=(event,newPrice)=>{
      setPrice(newPrice);
  }
  useEffect(() => {

    dispatch(getProduct(keyword,currentPage,category));
  }, [dispatch,keyword,currentPage,Price,category,ratings]);
let count=filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {product &&
              product.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
      
        {keyword && <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={Price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div>}
        {resultperpage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultperpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
         
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
