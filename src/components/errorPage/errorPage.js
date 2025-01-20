import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./errorPageStyle.css";

function Page404() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="error-page-container">
      <img
        src="https://i.pinimg.com/736x/24/ea/74/24ea74ca6e25174ec0a9b52795a390f3.jpg"
        alt="Page not found logo"
      />
      <h1>Page Not Found</h1>
      <p>
        The page
        <b>
          <code>"{location.pathname}"</code>
        </b>
        does not exist.
      </p>
      {/* Button to go back Home Page */}
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
}

export default Page404;
