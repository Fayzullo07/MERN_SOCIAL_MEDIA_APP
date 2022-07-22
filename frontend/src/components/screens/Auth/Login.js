import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Redux/Actions/UserActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };
  return (
    <div className="container my-4">
      <div className="bg-white text-center p-5 rounded shadow-lg">
        <img
          src="https://static3.depositphotos.com/1005574/198/v/600/depositphotos_1982796-stock-illustration-login-icon-button.jpg"
          className="w-100"
          style={{ height: "50vh" }}
        />
        <div className="input-group mb-3">
          <button className="btn btn-outline-info disabled">
            <i className="fas fa-lock"></i>
          </button>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <button className="btn btn-outline-info disabled">
            <i className="fas fa-key"></i>
          </button>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-info w-100 mb-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          <i className="fas fa-unlock-alt"></i>{" "}
          {loading ? "LOADING . . ." : "LOGIN"}
        </button>
        <span className="text-muted">Don't have an account? </span>
        <Link to="/register" className="mt-2 btn-sm fw-bold">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
