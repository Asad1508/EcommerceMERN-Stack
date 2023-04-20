import React, { Fragment, useEffect } from "react";
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import "./ProductList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAdminProduct,
 deleteProduct,
} from "../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import MetaData from "../component/layout/metaData";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../constants/productConstants";
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const { error, product } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
    
  }, [dispatch, toast, error,deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.id}`}>
              <EditIcon />

            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.id, "id")
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.Price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
      <ToastContainer/>
    </Fragment>
  );
};

export default ProductList;
