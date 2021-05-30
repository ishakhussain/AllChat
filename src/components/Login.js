import React from "react";

// Importing google and fb icons
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "firebase/app";
import { auth } from "../firebase";
import firebase from "firebase/app";

// Now create the functional component
const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to AllChat!</h2>

        <div
          className="login-button google"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
          }
        >
          {/* Call the google outline component  */}
          <GoogleOutlined /> Sign In with Google
        </div>

        {/* Add two line breaks between Google and Facebook icons */}
        <br />
        <br />

        <div
          className="login-button facebook"
          onClick={() =>
            auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          {/* Call the google outline component  */}
          <FacebookOutlined /> Sign in with Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
