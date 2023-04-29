import React, { Profiler, useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./reduxData/userSlice";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return unsub;
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        {!user ? (
          <LoginPage />
        ) : (
          <Routes>
            <Route exact path="/profile" element={<ProfilePage />}></Route>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
