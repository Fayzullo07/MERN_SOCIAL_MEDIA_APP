import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../Redux/Actions/UserActions";
import SearchUserModal from "./screens/SearchUserModal";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const userRegister = useSelector((state) => state.userLogin);
  const { userInfo } = userRegister;

  const dispatch = useDispatch();

  const LOGOUT = () => {
    dispatch(logout());
  };
  const renderNav = () => {
    if (userInfo && userInfo.msg) {
      return [
        <>
          <i
            onClick={() => setShow(!show)}
            className="fa-solid fa-magnifying-glass fs-2 me-4"
            style={{ color: "blue" }}
            title="Search User"
          ></i>
          <Link to="/profile" className="text-light me-4">
            <i className="fa-solid fa-user fs-2" title="Your Profile"></i>
          </Link>
          <Link to="/createpost" className="me-4" style={{ color: "indigo" }}>
            <i className="fa-solid fa-plus fs-2" title="Create a post"></i>
          </Link>
          <Link to="/login" className="text-reset me-4">
            <i
              className="fa-solid fa-arrow-right-from-bracket fs-2"
              title="LOGOUT"
              style={{ color: "red" }}
              onClick={LOGOUT}
            ></i>
          </Link>
        </>,
      ];
    } else {
      return [
        <Link to="/login" className="me-4">
          <i
            className="fa-solid fa-arrow-right-to-bracket fs-2"
            style={{ color: "greenyellow" }}
            title="LOGIN"
          ></i>
        </Link>,
      ];
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-gray shadow">
        <div className="container-fluid">
          <Link
            to={userInfo && userInfo.msg ? "/" : "/login"}
            className="text-light ms-lg-4 me-4 mt-lg-0"
          >
            <i className="fa-solid fa-house fs-1"></i>
          </Link>
          <div className="d-flex align-items-center">{renderNav()}</div>
        </div>
      </nav>
      <Outlet />
      {show && <SearchUserModal show={show} setShow={setShow} />}
    </>
  );
};

export default Navbar;
