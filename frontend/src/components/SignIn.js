import React, { useState } from "react";
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import { GoogleLogin } from "react-google-login";
import "../styles/SignForm.css";
import { toast } from "react-toastify";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [signUser, setSignUser] = useState({ email: "", password: "" });
  const signHandler = (e) => {
    const value = e.target.value;
    const data = e.target.name;
    setSignUser({ ...signUser, [data]: value });
  };

  const formHandler = async (e) => {
    e && e.preventDefault();
    if (signUser.email === "" || signUser.password === "") {
      toast.error("Ups! All fields are required", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        let response = await dispatch(usersActions.signInUser(signUser));
        if (!response.data.success) {
          toast.warn(
            "Problem signing in, maybe your email or password are incorrect!",
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        } else {
          toast.success("Signed in successfully, welcome back!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } catch (err) {
        console.error(err);
        return false;
      }
    }
  };

  const responseGoogle = async (res) => {
    let logInGoogle = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      google: true,
    };
    try {
      let response = await dispatch(usersActions.signInUser(logInGoogle));
      if (!response.data.success) {
        toast.warn("Problem signing in!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Signed in successfully, welcome back!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      return false;
    }
  };

  return (
    <form action="#" className="sign-in-form">
      <h2 className="title">Sign In</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={signUser.email}
          onChange={signHandler}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={signUser.password}
          onChange={signHandler}
        />
      </div>
      <button 
      onClick={formHandler}
       className="btn solid">
        SIGN IN
      </button>
      <p className="social-text">Or</p>
      <div className="social-media">
        <GoogleLogin
          clientId="988627387814-6eohcathqhap4dp3d82pi8j90ge59o1u.apps.googleusercontent.com"
          buttonText="Sign In With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </form>
  );
};

export default SignIn;
