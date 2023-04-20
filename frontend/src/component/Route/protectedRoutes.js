import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route,Outlet } from "react-router-dom";




const ProtectedRoute = ({isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return isAuthenticated ? <Component  /> : <Navigate to="/login" />



  // return (
  //   <Fragment>
  //     {loading === false && (
  //       // <Route
  //         // {...rest}
  //         // render={(props) => {
  //           // if (isAuthenticated === false) {
  //           //   return  <Navigate to="/login" />;
  //           // }


  //           // if (isAdmin === true && user.role !== "admin") {
  //           //   return <Navigate to="/login" />;
  //           // }

  //           // return <Component {...props} />;
  //         // }}
  //       // />
  //     )}
  //   </Fragment>
  // );
};

export default ProtectedRoute;












// const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             if (isAdmin === true && user.role !== "admin") {
//               return <Navigate to="/login" />;
//             }

//             return <Element {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;
