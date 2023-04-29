import React, { useRef } from "react";
import "./SignUpPage.css";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { createUserWithEmailAndPassword } from "../firebase";

function SignUpPage() {
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
  };

  return (
    <div className="signup_page_container">
      <form>
        <h1>Sign In</h1>
        <input ref={email} placeholder="Email" type="email" />
        <input ref={password} placeholder="Password" type="password" />
        <button onClick={signIn} type="submit">
          Sign In
        </button>

        <h4>
          <span className="new_to_netflix"> New to Netflix? </span>

          <span className="sign_up_link" onClick={signUp}>
            Sign up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpPage;
