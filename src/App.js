import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./reduxData/userSlice";
import ProfilePage from "./pages/ProfilePage";
import StartPage from "./pages/StartPage";
import subContext from "./subContext";
import db from "./firebase";
import { onSnapshot, collection } from "firebase/firestore";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const user = useSelector(selectUser);
  const [hasSubscription, setHasSubscription] = useState(false);
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

  useEffect(() => {
    if (user && user.uid) {
      const customerSubsRef = collection(
        db,
        "customers",
        user.uid,
        "subscriptions"
      );
      const unsubscribe = onSnapshot(customerSubsRef, (querySnapshot) => {
        let subscriptionFound = false;
        querySnapshot.forEach((sub) => {
          if (sub.exists()) {
            subscriptionFound = true;
          }
        });
        setHasSubscription(subscriptionFound);
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="app">
      <BrowserRouter>
        <subContext.Provider value={hasSubscription}>
          {!user ? (
            <StartPage />
          ) : (
            <Routes>
              <Route exact path="/profile" element={<ProfilePage />}></Route>
              {hasSubscription ? (
                <Route exact path="/" element={<Home />}></Route>
              ) : (
                <Route exact path="/" element={<ProfilePage />}></Route>
              )}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          )}
        </subContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
