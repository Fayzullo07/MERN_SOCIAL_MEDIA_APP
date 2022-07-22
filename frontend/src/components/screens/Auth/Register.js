import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PickerOverlay } from "filestack-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "./../../../Redux/Actions/UserActions";
import UploadImage from "../../../Untils/UploadImage";

const Register = () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirm: "",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState(initialState);
  const [isPicker, setIsPicker] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [photo, setPhoto] = useState("");

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;

  // Form Submission
  const handleSubmit = (e) => {
    if (photo) {
      Object.assign(data, { photo });
    }
    e.preventDefault();
    dispatch(register(data, navigate));
  };

  return (
    <div className="container my-2">
      <form
        className="text-center bg-white rounded shadow-lg p-5"
        onSubmit={handleSubmit}
      >
        <button
          onClick={() => (isPicker ? setIsPicker(false) : setIsPicker(true))}
          type="button"
          className="border mb-4 rounded-circle"
          style={{ objectFit: "cover", width: "164px", height: "155px" }}
          disabled={disabled}
        >
          {photo ? (
            <img
              src={photo}
              alt="imageUpload"
              className="rounded-circle"
              style={{ objectFit: "cover", width: "150px", height: "150px" }}
            />
          ) : (
            <img
              src="http://cdn.onlinewebfonts.com/svg/img_518099.png"
              className="w-100 rounded-circle"
              alt="ImageDefault"
              style={{ objectFit: "cover" }}
              title="Choose Image"
            />
          )}
        </button>

        <div className="input-group mb-3">
          <button className="btn btn-outline-primary disabled">
            <i className="fas fa-user"></i>
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <button className="btn btn-outline-primary disabled">
            <i className="fas fa-lock"></i>
          </button>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Your Email"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <button className="btn btn-outline-primary disabled">
            <i className="fas fa-key"></i>
          </button>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Your Password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-group mb-3">
          <button className="btn btn-outline-primary disabled">
            <i className="fas fa-key"></i>
          </button>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            name="confirm"
            value={data.confirm}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 mb-2"
          disabled={loading}
        >
          <i className="fas fa-user-lock"></i>{" "}
          {loading ? "Loading . . ." : "REGISTER"}
        </button>
        {/* FileStack */}
        <div className="mt-4 position-relative">
          {isPicker && (
            <UploadImage
              setPhoto={setPhoto}
              setIsPicker={setIsPicker}
              setDisabled={setDisabled}
            />
          )}
        </div>
        <span className="text-muted">Have already an account?</span>
        <Link to="/login" className="mt-2 btn-sm fw-bolder">
          Login here
        </Link>
      </form>
    </div>
  );
};

export default Register;
