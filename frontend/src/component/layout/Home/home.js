import React, { Fragment, useEffect } from 'react'
import './home.css'
import MetaData from '../metaData'
import {getProduct} from '../../../actions/productActions'
import {useDispatch,useSelector} from 'react-redux'
import Product from './productCard'
import Loader from '../../Loader'
const Home = () => {
    const dispatch=useDispatch()
    // isme jo destructunring kr rhe wo reducer se kr rhe
    const productss=useSelector((state) => state.products);
    const { loading, error, product } =productss 
    // const userLogin = useSelector((state) => state.userLogin);
    // const { loading, error, userInfo } = userLogin;
  useEffect(()=>{
    dispatch(getProduct())
  },[dispatch])
  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="ECOMMERCE" />

        <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
            <button>
              Scroll 
            </button>
          </a>
        </div>

        <h2 className="homeHeading">Featured Products</h2>
        <div className="container" id="container">
          {product &&
            product.map((product) => (
                
                
              <Product key={product._id} product={product} />
               
            ))
            

          }
        </div>
      </Fragment>
    )}
  </Fragment>
    )
}

export default Home