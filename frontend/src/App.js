import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Chat from "./components/screens/Chat";
import CreatePost from "./components/screens/CreatePost";
import Home from "./components/screens/Home";
import Login from "./components/screens/Auth/Login";
import Profile from "./components/screens/Profile";
import ProfileUser from "./components/screens/ProfileUser";
import Register from "./components/screens/Auth/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// LOADING SKELET
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_LOGIN_SUCCESS } from "./Redux/Constants/UserConstants";
import PageNotFound from "./components/screens/PageNotFound";

const Routing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user?.msg) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: user });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
