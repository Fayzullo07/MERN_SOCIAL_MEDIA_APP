import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Redux/Actions/UserActions";
import { USER_GET_ALL_SUCCESS } from "../../Redux/Constants/UserConstants";
import SkeletonLoading from "../../Untils/SkeletLoading";

const HomeRSideUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const getALLUsers = useSelector((state) => state.users);
  const { users } = getALLUsers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      {users ? (
        users
          ?.map((user) => (
            <Link
              key={user._id}
              to={
                user?._id !== userInfo?.user?._id
                  ? `/profile/${user?._id}`
                  : "/profile"
              }
              className="text-reset text-decoration-none"
            >
              <div className="row border rounded-pill mb-2">
                <div className="col p-0">
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="rounded-circle"
                    width="60"
                    height="60"
                  />
                </div>
                <div className="col pt-2 fst-italic">
                  <h2>
                    {user.name.length > 12
                      ? `${user.name.substring(0, 10)}...`
                      : user.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))
          .reverse()
      ) : (
        <SkeletonLoading height={60} count={10} rodius={60} />
      )}
    </>
  );
};

export default HomeRSideUsers;
