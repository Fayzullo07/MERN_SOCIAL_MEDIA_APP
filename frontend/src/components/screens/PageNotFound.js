import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <h1 className="display-1 fw-bold text-white">404</h1>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
