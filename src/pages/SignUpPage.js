import React, { useContext, useRef, useState } from "react";
import "./SignUpPage.css";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { createUserWithEmailAndPassword } from "../firebase";
import subContext from "../subContext";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const hasSubscription = useContext(subContext);

  const [register, setRegister] = useState(false);
  const email = useRef(null);
  const password = useRef(null);

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((authUser) => {})
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((authUser) => {})
      .catch((error) => {
        alert(error.message);
      });
    if (!hasSubscription) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signup_page_container">
      {!register ? (
        <form>
          <h1>Sign In</h1>
          <input ref={email} placeholder="Email" type="email" />
          <input ref={password} placeholder="Password" type="password" />
          <button onClick={signIn} type="submit">
            Sign In
          </button>

          <h4>
            <span className="new_to_netflix"> New to Netflix? </span>

            <span
              className="sign_up_link"
              onClick={() => {
                setRegister(true);
              }}
            >
              Sign up now.
            </span>
            <div>Demo Account:</div>
            <p>Email: demo@gmail.com</p>
            <p>Password: password</p>
          </h4>
        </form>
      ) : (
        <form>
          <h1>Register</h1>
          <input ref={email} placeholder="Email" type="email" />
          <input ref={password} placeholder="Password" type="password" />
          <button onClick={signUp} type="submit">
            Register
          </button>

          <h4>
            <span className="new_to_netflix">Have an account? </span>

            <span className="sign_up_link" onClick={() => setRegister(false)}>
              Login Now.
            </span>
            <div>Demo Account:</div>
            <p>Email: demo@gmail.com</p>
            <p>Password: password</p>
          </h4>
        </form>
      )}
    </div>
  );
}

export default SignUpPage;
