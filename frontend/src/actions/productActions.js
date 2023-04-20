import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    CLEAR_ERRORS,} from '../constants/productConstants';


    export const getProduct=(keyword="",currentPage=1,category)=>async (dispatch)=>{
      
        try {
            dispatch({type:ALL_PRODUCT_REQUEST})
          
            let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}`

            if(category){
              link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`

            }
            const {data}=await axios.get(link)
            dispatch({
                type:ALL_PRODUCT_SUCCESS,
                payload:data
            })

        } catch (error) {
            dispatch({
                type:ALL_PRODUCT_FAIL,
                error:error.response.data.message
            })
        }

    }
    // Get Product details
    export const getProductDetails =(id) =>
    async (dispatch) => {
      try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        console.log("ye actions ha isme data ahr ya ni"+id)
        const { data } = await axios.get(`/api/v1/productsingledetail/${id}`);
  
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
      } catch (error) {
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message,
        });
      }
    };
 // Get All Products For Admin
 export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({
      type: ADMIN_PRODUCT_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
 // Create Product
 export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/products/new`,
      productData,
      config
    );

    dispatch({
      type: NEW_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
          // Delete Product by admin
    export const deleteProduct = (id) => async (dispatch) => {
      try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
    
        const { data } = await axios.delete(`/api/v1/admin/productdlt/${id}`);
    
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: DELETE_PRODUCT_FAIL,
          payload: error.response.data.message,
        });
      }
    };

    // Update Product
    export const updateProduct = (id, productData) => async (dispatch) => {
      try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
    
        const config = {
          headers: { "Content-Type": "application/json" },
        };
    
        const { data } = await axios.put(
          `/api/v1/admin/products/${id}`,
          productData,
          config
        );
    
        dispatch({
          type: UPDATE_PRODUCT_SUCCESS,
          payload: data.success,
        });
      } catch (error) {
        dispatch({
          type: UPDATE_PRODUCT_FAIL,
          payload: error.response.data.message,
        });
      }
    };
    // Clearing Errors
    export const clearErrors = () => async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
      };
      