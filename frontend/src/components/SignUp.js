import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import { GoogleLogin } from "react-google-login";
import "../styles/SignForm.css";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const SignUp = (props) => {

  const dispatch = useDispatch();
  const [errorInputs, setErrorInputs] = useState({}) 
  const [newUser, setNewUser] = useState({
    name: "",
    lastName: "",
    email: "",
    img: "",
    password: "",
    phoneNumber: "",
    street: "",
    number: "",
    commune: "",
  });
  
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const valuesHandler = (e) => {
    const value = e.target.value;
    const data = e.target.name;
    setNewUser({ ...newUser, [data]: value });
  };

  const formHandler = async (e) => {
    e && e.preventDefault();
    if (Object.values(newUser).some((value) => value === "")) {
      toast.warn('Ups! All fields are required!', {
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
        let response = await dispatch(usersActions.signUpUser(newUser));
        if (response.data.success) {
          toast.success('Signed in successfully, welcome!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
        } else if (!response.data.success) {
          let errors = response.data.validate;
          if(errors !== undefined) {
              setErrorInputs({})
                errors.map(error => setErrorInputs(messageError => {
                  return {
                    ...messageError,
                    [error.path]: error.message
                  }
                }))
              errors.map((err) => toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                }));
              } else {
                const errorEmail = response.data.error
                setErrorInputs({email: errorEmail})
                toast.error(errorEmail, {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  })
              }
        } else {
          toast.error(response.data.error, {
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
    let googleUser = {
      name: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      img: res.profileObj.imageUrl,
      phoneNumber: 111111,
      street: "default",
      number: 111,
      commune: "default",
      google: true,
    };
    try {
      let response = await dispatch(usersActions.signUpUser(googleUser));
      if (response.data.success) {
        toast.success('Signed in successfully, welcome back!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      }else{
        toast.warn(response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <form className="sign-up-form">
      <h2 className="title">Sign Up</h2>
      
      <div className="div-input-errors">
        <div className="name-input">
          <div className="flex-column">
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="First Name"
                name="name"
                value={newUser.name}
                onChange={valuesHandler}
              />
            </div>
              <p>{errorInputs.name}</p>
          </div>
          <div className="flex-column">
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={newUser.lastName}
                onChange={valuesHandler}
              />
            </div>
                <p>{errorInputs.lastName}</p>
          </div>
        </div>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={valuesHandler}
          />
        </div>
          <p>{errorInputs.email}</p>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={valuesHandler}
          />
        </div>
        <p>{errorInputs.password}</p>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-lock"></i>
          <input
            type="number"
            placeholder="Phone Number"
            name="phoneNumber"
            value={newUser.phoneNumber}
            onChange={valuesHandler}
          />
        </div>
        <p>{errorInputs.phoneNumber}</p>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-portrait"></i>
          <input
            type="text"
            placeholder="Profile Pic URL"
            name="img"
            value={newUser.img}
            onChange={valuesHandler}
          />
        </div>
        <p>{errorInputs.img}</p>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-house-user"></i>
          <input
            type="text"
            placeholder="Commune"
            name="commune"
            value={newUser.commune}
            onChange={valuesHandler}
          />
        </div>
        <p>{errorInputs.commune}</p>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-house-user"></i>
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={newUser.street}
            onChange={valuesHandler}
          />
        </div>
        <p>{errorInputs.street}</p>
      </div>
      <div className="div-input-errors">
        <div className="input-field">
          <i className="fas fa-house-user"></i>
          <input
            type="number"
            placeholder="Number"
            name="number"
            value={newUser.number}
            onChange={valuesHandler}
          />
        </div>
        <p>{errorInputs.number}</p>
      </div>
      <div className="sign-btns">
        <button className="btn sign-up-btn" 
        onClick={formHandler}
        >
          SIGN UP
        </button>
        <div className="social-media">
          <GoogleLogin
            clientId="988627387814-6eohcathqhap4dp3d82pi8j90ge59o1u.apps.googleusercontent.com"
            buttonText="Sign Up With Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </form>
  );
};

export default SignUp;
