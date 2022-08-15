import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SkeletonLoading from "../../Untils/SkeletLoading";
import {
  userFollow,
  userProfileAction,
  userUnFollow,
} from "./../../Redux/Actions/UserActions";

const ProfileUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const userProFile = useSelector((state) => state.userProfile);
  const { userProfileInfo } = userProFile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(userProfileAction(userId));
  }, [userId]);

  return (
    <div className="container mt-lg-5 mt-md-5 mt-2">
      {userProfileInfo && userProfileInfo?.user ? (
        <div className="card p-3">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <img
                src={userProfileInfo?.user?.photo}
                className="rounded-pill"
                width="250"
                height="250"
              />
            </div>

            <div className="w-100 text-center">
              <h1 className="my-3">{userProfileInfo?.user?.name}</h1>

              <div className="p-2 mt-2 bg-secondary d-flex justify-content-around rounded text-white stats">
                <div className="d-flex flex-column">
                  <span className="articles">Posts</span>
                  <span className="number1">
                    {userProfileInfo?.posts?.length}
                  </span>
                </div>

                <div className="d-flex flex-column">
                  <span className="followers">Followers</span>
                  <span className="number3">
                    {userProfileInfo.user && userProfileInfo.user.followers
                      ? userProfileInfo.user.followers.length
                      : 0}
                  </span>
                </div>

                <div className="d-flex flex-column">
                  <span className="rating">Following</span>
                  <span className="number3">
                    {userProfileInfo.user && userProfileInfo.user.following
                      ? userProfileInfo.user.following.length
                      : 0}
                  </span>
                </div>
              </div>

              <div className="button mt-3 d-flex flex-row align-items-center gap-5">
                {!userProfileInfo.user.followers.includes(userInfo.user._id) ? (
                  <button
                    onClick={() =>
                      dispatch(userFollow(userId, userInfo.user._id))
                    }
                    className="btn btn-sm btn-success w-100 ml-2"
                  >
                    FOLLOW
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(userUnFollow(userId, userInfo.user._id))
                    }
                    className="btn btn-sm btn-outline-success w-100 ml-2"
                  >
                    UNFOLLOW
                  </button>
                )}

                {/* <button
                  disabled
                  className="btn btn-sm btn-outline-primary w-100"
                >
                  CHAT
                  <i className="far fa-comments ms-lg-1"></i>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonLoading height={400} count={1} rodius={10} />
      )}
      <div className="container-fluid mb-1 py-4 bg-white rounded">
        <div className="row g-2">
          {userProfileInfo && userProfileInfo?.posts?.length != 0 ? (
            userProfileInfo?.posts?.map((post) => (
              <div className="col-lg-3 col-md-4 col-6" key={post?._id}>
                <img
                  src={post?.photo}
                  alt="image 1"
                  className="w-100 rounded-3"
                  style={{ height: "25vh" }}
                />
              </div>
            ))
          ) : (
            <h1>Not Photo</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
