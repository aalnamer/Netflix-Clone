import React from "react";
import "./NotFoundPage.css";
import Nav from "../nav/Nav";

function NotFoundPage() {
  return (
    <div className="not_found_container">
      <Nav />
      <div className="not_found_content">
        <h1>404 Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
