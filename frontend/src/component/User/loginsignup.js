import React, { Fragment,useRef,useState,useEffect } from 'react'
import "./loginsignup.css"
import Loader from "../Loader"
import { Link } from 'react-router-dom'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userActions";
import { useNavigate,useLocation } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const LoginSignUp = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const location=useLocation()
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/1.jpg");
  const [avatarPreview, setAvatarPreview] = useState("/1.jpg");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    console.log(name)
    // const myForm = new FormData();
    // myForm.set("name", name);
    // myForm.set("email", email);
    // myForm.set("password", password);
    // myForm.set("avatar", avatar);
    // console.log(myForm.append)

    dispatch(register(name,email,password,avatar));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
   
   const redirect = location.search ? location.search.split("=")[1] : "/account";
   
  useEffect(() => {
    if (error) {
      toast.warn(error,{
        position: "bottom-center",
      })
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, navigate, isAuthenticated,toast,redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/forgotpassword">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
          <ToastContainer/>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;



// const LoginSignup = () => {
//   const dispatch=useDispatch()
//   const navigate=useNavigate()
//   const { error, loading, isAuthenticated } = useSelector(
//         (state) => state.user
//       );
//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab = useRef(null);
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [user, setUser] = useState({
//         name: "",
//         email: "",
//         password: "",
//       });
    
//       const { name, email, password } = user;
//       const [avatar, setAvatar] = useState();
//      const [avatarPreview, setAvatarPreview] = useState("/man.jpg");
      
//   const loginSubmit=(e)=>{
//     e.preventDefault()
//     //yaha data bhj rhe pass kr rhe email aur password login ka function call kr k jo useraction.js me ha  
//     dispatch(login(loginEmail,loginPassword))
// }
// const registerSubmit = (e) => {
//         e.preventDefault();
    
//         const myForm = new FormData();
    
//         myForm.set("name", name);
//         myForm.set("email", email);
//         myForm.set("password", password);
//         myForm.set("avatar", avatar);
//         dispatch(register(myForm));
        
//       };
//          const registerDataChange = (e) => {
//           //ye pic ko handle krne k liye 
//             if (e.target.name === "avatar") {
//               const reader = new FileReader();
// //ye function tab chle ga jab isme file koi add hogi aur wo file reader.readAsDataURL(e.target.files[0]);
// //se add horhi
//               reader.onload = () => {
//                   //iska matlab k readystate agr done hojye
//                 if (reader.readyState === 2) {
//                   setAvatarPreview(reader.result);
//                   setAvatar(reader.result);
//                 }
//               };
                       
//               reader.readAsDataURL(e.target.files[0]);
//             } else {
//               setUser({ ...user, [e.target.name]: e.target.value });
//             }
//           };
//     useEffect(()=>{
//         if (error) {
          
//         dispatch(clearErrors());

//     }
//     //jab tak login ha account me redirect hu
//     if(isAuthenticated)
//     {
//         navigate("/account");
//     }
//     },[dispatch,error,isAuthenticated,navigate]);

//     const switchTabs = (e, tab) => {
//             if (tab === "login") {
//               switcherTab.current.classList.add("shiftToNeutral");
//               switcherTab.current.classList.remove("shiftToRight");
        
//               registerTab.current.classList.remove("shiftToNeutralForm");
//               loginTab.current.classList.remove("shiftToLeft");
//             }
//             if (tab === "register") {
//               switcherTab.current.classList.add("shiftToRight");
//               switcherTab.current.classList.remove("shiftToNeutral");
        
//               registerTab.current.classList.add("shiftToNeutralForm");
//               loginTab.current.classList.add("shiftToLeft");
//             }
//           };
        

//   return (
//    <Fragment>
//        {loading ?<Loader/>:<Fragment>
//       <div className="LoginSignUpContainer">
//             <div className="LoginSignUpBox">
//               <div>
//                 <div className="login_signUp_toggle">
//                   <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
//                   <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
//                 </div>
//                 <button ref={switcherTab}></button>
//               </div>
//               <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
//                 <div className="loginEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     value={loginEmail}
//                     onChange={(e) => setLoginEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     value={loginPassword}
//                     onChange={(e) => setLoginPassword(e.target.value)}
//                   />
//                 </div>
//                 <Link to="/password/forgot">Forget Password ?</Link>
//                 <input type="submit" value="Login" className="loginBtn" />
//               </form>
//               {/* ye wala form registeration k liye ha */}
//               <form
//                 className="signUpForm"
//                 ref={registerTab}
//                 //isko likha q k user ki image b upload krni
//                 encType="multipart/form-data"
//                 onSubmit={registerSubmit}
//               >
//                 <div className="signUpName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     name="password"
//                     value={password}
//                     onChange={registerDataChange}
//                   />
//                 </div>

//                 <div id="registerImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <input type="submit" value="Register" className="signUpBtn" />
//               </form>
//             </div>
//           </div>
          
//    </Fragment>}
//    </Fragment>
//   )
// }

// export default LoginSignup











// import React, { Fragment,useRef,useState,useEffect } from 'react'
// import "./loginsignup.css"
// import Loader from "../Loader"
// import { Link } from 'react-router-dom'
// import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// // import LockOpenIcon from '@material-ui/icons/LockOpen';
// import FaceIcon from '@mui/icons-material/Face';
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, login, register } from "../../actions/userActions";
// import { useNavigate,useLocation } from 'react-router-dom';
// import {ToastContainer,toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'



// const LoginSignUp = () => {
//   const dispatch = useDispatch();
//   const navigate=useNavigate();
//   const location=useLocation()
// //   isme error,loading,isAuthenticated userReducer se get kr rhe
// // isAuthenticated ko issliye likha takay jab login kre tu redirect hojye account ya kisi page pr 
// // tu isAuthenticated k through k check kre ga login hogya tu redirect kre
// // isAuthenticated ko false kia agr error ajata ya loading me hoga
//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.user
//   );

//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab = useRef(null);

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const { name, email, password } = user;

//   const [avatar, setAvatar] = useState("/1.jpg");
//   const [avatarPreview, setAvatarPreview] = useState("/1.jpg");

//   const loginSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(loginEmail, loginPassword));
//   };

//   const registerSubmit = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();
//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("password", password);
//     myForm.set("avatar", avatar);
//     dispatch(register(myForm));
//     console.log(myForm.name)
//   };

//   const registerDataChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar(reader.result);
//         }
//       };

//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };
//    //location.search agr ha tu shipping me jye wrna : /account me
//    //iss code ka faida user agr begair login k add to cart kre ga items tu jab check out pr click
//   //  kre ga tu ussay redirect krde ga accounnt me q k wo login ni 
//   //iss code se navigate kre ga chekout me agr login k begair add to cart kre ga
//    const redirect = location.search ? location.search.split("=")[1] : "/account";

//   useEffect(() => {
//     if (error) {
//       toast.warn(error,{
//         position: "bottom-center",
//       })
//       dispatch(clearErrors());
//     }
// //    agr authenticated true ha tu redirect kre /account me
// // aur ye isAuthentiacted userReducer me true krdia gya jab login success hogi
//     if (isAuthenticated) {
//       navigate(redirect);
//     }
//   }, [dispatch, error, navigate, isAuthenticated,toast,redirect]);

//   const switchTabs = (e, tab) => {
//     if (tab === "login") {
//       switcherTab.current.classList.add("shiftToNeutral");
//       switcherTab.current.classList.remove("shiftToRight");

//       registerTab.current.classList.remove("shiftToNeutralForm");
//       loginTab.current.classList.remove("shiftToLeft");
//     }
//     if (tab === "register") {
//       switcherTab.current.classList.add("shiftToRight");
//       switcherTab.current.classList.remove("shiftToNeutral");

//       registerTab.current.classList.add("shiftToNeutralForm");
//       loginTab.current.classList.add("shiftToLeft");
//     }
//   };

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <div className="LoginSignUpContainer">
//             <div className="LoginSignUpBox">
//               <div>
//                 <div className="login_signUp_toggle">
//                   <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
//                   <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
//                 </div>
//                 <button ref={switcherTab}></button>
//               </div>
//               <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
//                 <div className="loginEmail">
//                   <MailOutlinedIcon  />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     value={loginEmail}
//                     onChange={(e) => setLoginEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     value={loginPassword}
//                     onChange={(e) => setLoginPassword(e.target.value)}
//                   />
//                 </div>
//                 <Link to="/forgotpassword">Forget Password ?</Link>
//                 <input type="submit" value="Login" className="loginBtn" />
//               </form>
//               <form
//                 className="signUpForm"
//                 ref={registerTab}
//                 encType="multipart/form-data"
//                 onSubmit={registerSubmit}
//               >
//                 <div className="signUpName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpEmail">
//                   < MailOutlinedIcon  />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     name="password"
//                     value={password}
//                     onChange={registerDataChange}
//                   />
//                 </div>

//                 <div id="registerImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <input type="submit" value="Register" className="signUpBtn" />
//               </form>
//             </div>
//           </div>
//           <ToastContainer/>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default LoginSignUp;



// const LoginSignup = () => {
//   const dispatch=useDispatch()
//   const navigate=useNavigate()
//   const { error, loading, isAuthenticated } = useSelector(
//         (state) => state.user
//       );
//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab = useRef(null);
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [user, setUser] = useState({
//         name: "",
//         email: "",
//         password: "",
//       });
    
//       const { name, email, password } = user;
//       const [avatar, setAvatar] = useState();
//      const [avatarPreview, setAvatarPreview] = useState("/man.jpg");
      
//   const loginSubmit=(e)=>{
//     e.preventDefault()
//     //yaha data bhj rhe pass kr rhe email aur password login ka function call kr k jo useraction.js me ha  
//     dispatch(login(loginEmail,loginPassword))
// }
// const registerSubmit = (e) => {
//         e.preventDefault();
    
//         const myForm = new FormData();
    
//         myForm.set("name", name);
//         myForm.set("email", email);
//         myForm.set("password", password);
//         myForm.set("avatar", avatar);
//         dispatch(register(myForm));
        
//       };
//          const registerDataChange = (e) => {
//           //ye pic ko handle krne k liye 
//             if (e.target.name === "avatar") {
//               const reader = new FileReader();
// //ye function tab chle ga jab isme file koi add hogi aur wo file reader.readAsDataURL(e.target.files[0]);
// //se add horhi
//               reader.onload = () => {
//                   //iska matlab k readystate agr done hojye
//                 if (reader.readyState === 2) {
//                   setAvatarPreview(reader.result);
//                   setAvatar(reader.result);
//                 }
//               };
                       
//               reader.readAsDataURL(e.target.files[0]);
//             } else {
//               setUser({ ...user, [e.target.name]: e.target.value });
//             }
//           };
//     useEffect(()=>{
//         if (error) {
          
//         dispatch(clearErrors());

//     }
//     //jab tak login ha account me redirect hu
//     if(isAuthenticated)
//     {
//         navigate("/account");
//     }
//     },[dispatch,error,isAuthenticated,navigate]);

//     const switchTabs = (e, tab) => {
//             if (tab === "login") {
//               switcherTab.current.classList.add("shiftToNeutral");
//               switcherTab.current.classList.remove("shiftToRight");
        
//               registerTab.current.classList.remove("shiftToNeutralForm");
//               loginTab.current.classList.remove("shiftToLeft");
//             }
//             if (tab === "register") {
//               switcherTab.current.classList.add("shiftToRight");
//               switcherTab.current.classList.remove("shiftToNeutral");
        
//               registerTab.current.classList.add("shiftToNeutralForm");
//               loginTab.current.classList.add("shiftToLeft");
//             }
//           };
        

//   return (
//    <Fragment>
//        {loading ?<Loader/>:<Fragment>
//       <div className="LoginSignUpContainer">
//             <div className="LoginSignUpBox">
//               <div>
//                 <div className="login_signUp_toggle">
//                   <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
//                   <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
//                 </div>
//                 <button ref={switcherTab}></button>
//               </div>
//               <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
//                 <div className="loginEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     value={loginEmail}
//                     onChange={(e) => setLoginEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     value={loginPassword}
//                     onChange={(e) => setLoginPassword(e.target.value)}
//                   />
//                 </div>
//                 <Link to="/password/forgot">Forget Password ?</Link>
//                 <input type="submit" value="Login" className="loginBtn" />
//               </form>
//               {/* ye wala form registeration k liye ha */}
//               <form
//                 className="signUpForm"
//                 ref={registerTab}
//                 //isko likha q k user ki image b upload krni
//                 encType="multipart/form-data"
//                 onSubmit={registerSubmit}
//               >
//                 <div className="signUpName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     name="password"
//                     value={password}
//                     onChange={registerDataChange}
//                   />
//                 </div>

//                 <div id="registerImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <input type="submit" value="Register" className="signUpBtn" />
//               </form>
//             </div>
//           </div>
          
//    </Fragment>}
//    </Fragment>
//   )
// }

// export default LoginSignup


