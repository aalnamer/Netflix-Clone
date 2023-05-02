import React, { useState } from "react";
import "./StartPage.css";
import SignUpPage from "./SignUpPage";

function StartPage() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="login_container">
      <div className="login_background">
        <img
          className="login_logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="logo"
        />
        <button onClick={() => setSignIn(true)} className="login_button">
          Sign In
        </button>
        <div className="login_bottom" />
      </div>
      <div className="login_content">
        {signIn ? (
          <SignUpPage />
        ) : (
          <>
            <h1> Unlimited films, TV programs and more.</h1>
            <h2> Watch anywhere. Cancel at any time.</h2>
            <br></br>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <br></br>
            <div className="login_input">
              <form>
                <input type="email" placeholder="Enter Email Address" />
                <button
                  onClick={() => setSignIn(true)}
                  className="login_input_button"
                >
                  GET STARTED
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default StartPage;
