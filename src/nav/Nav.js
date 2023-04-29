import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Navigate, useNavigate } from "react-router-dom";

function Nav() {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const transNav = () => {
    if (window.scrollY > 100) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transNav);
    return () => {
      window.removeEventListener("scroll", transNav);
    };
  }, []);
  return (
    <div className={`nav ${display && "dark"}`}>
      <div className="nav_container">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png"
          onClick={() => {
            navigate("/");
          }}
        />
        <img
          className="avatar"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
          onClick={() => {
            navigate("/profile");
          }}
        />
      </div>
    </div>
  );
}

export default Nav;
