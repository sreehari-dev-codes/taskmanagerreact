import React from "react";
import "./Error.scss";

function Error() {
  return (
    <div className="error-container">
      <img
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?ga=GA1.1.539061890.1721370777&semt=ais_hybrid"
        alt="404 Error"
        className="error-image large"
      />
      <h1 className="error-title">Oops! Page Not Found</h1>
      <p className="error-message">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <a href="/" className="error-button">
        Go Home
      </a>
    </div>
  );
}

export default Error;
