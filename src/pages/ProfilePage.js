import React from "react";
import "./ProfilePage.css";
import Nav from "../nav/Nav";
import { useSelector } from "react-redux";
import { selectUser } from "../reduxData/userSlice";
import { auth } from "../firebase";
import PlansPage from "./PlansPage";

function ProfilePage() {
  const user = useSelector(selectUser);
  return (
    <div className="profile_container">
      <Nav />
      <div className="profile_page_content">
        <h1>Edit Profile</h1>
        <div className="profile_page_info">
          <img
            className="profile_avatar"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png"
          />

          <div className="profile_page_details">
            <h2>{user.email}</h2>
            <div className="profile_page_sub">
              <h3>Plans</h3>
              <PlansPage />
              <button
                className="profile_page_signout"
                onClick={() => {
                  auth.signOut();
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
