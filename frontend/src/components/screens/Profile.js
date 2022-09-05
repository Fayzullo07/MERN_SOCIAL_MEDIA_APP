import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Redux/Actions/PostsActions";
import { getMyFollowers } from "../../Redux/Actions/UserActions";
import EditProfile from "./EditProfile";
import ShowFollowersModal from "./ShowFollowersModal";
import ShowFollowingModal from "./ShowFollowingModal";

const Profile = () => {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getALLPosts = useSelector((state) => state.posts);
  const { posts } = getALLPosts;

  const myPosts = posts?.filter(
    (post) => post?.postedBy?._id === userInfo?.user?._id
  );

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getMyFollowers(userInfo.user._id));
  }, []);

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  return (
    <div className="container mt-lg-5 mt-md-5 mt-2">
      {userInfo && userInfo?.user ? (
        <div className="card p-3">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <img
                src={userInfo.user.photo}
                className="rounded-pill"
                width="250"
              />
            </div>

            <div className="w-100 text-center">
              <h1 className="my-3">{userInfo.user.name}</h1>
              <h3 className="text-muted">{userInfo.user.email}</h3>

              <div className="p-2 mt-2 bg-secondary d-flex justify-content-around rounded text-white stats">
                <div className="d-flex flex-column">
                  <span className="articles">Posts</span>
                  <span className="number1">{myPosts?.length}</span>
                </div>

                <div className="d-flex flex-column">
                  <span
                    className="followers"
                    onClick={() => setShowFollowersModal(!showFollowersModal)}
                  >
                    Followers
                  </span>
                  <span className="number2">
                    {userInfo.user && userInfo.user.followers
                      ? userInfo.user.followers.length
                      : 0}
                  </span>
                </div>

                <div className="d-flex flex-column">
                  <span
                    className="rating"
                    onClick={() => setShowFollowingModal(!showFollowingModal)}
                  >
                    Following
                  </span>
                  <span className="number3">
                    {userInfo.user && userInfo.user.following
                      ? userInfo.user.following.length
                      : 0}
                  </span>
                </div>
              </div>

              <div className="button mt-3 d-flex flex-row align-items-center gap-5">
                <button
                  onClick={() => setShowEditModal(!showEditModal)}
                  className="btn btn-sm btn-outline-warning w-100"
                >
                  <i className="far fa-edit me-lg-1"></i>
                  EDIT
                </button>

                {/* <button
                  disabled
                  className="btn btn-sm btn-outline-primary w-100"
                  title="Will be added in the future"
                >
                  CHAT
                  <i className="far fa-comments ms-lg-1"></i>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>LOADING . . .</h1>
      )}
      <div className="container-fluid mb-1 py-4 bg-white rounded">
        <div className="row g-2">
          {posts && myPosts?.length != 0 ? (
            myPosts
              ?.map((post) => (
                <div className="col-lg-3 col-md-4 col-12" key={post?._id}>
                  <img
                    src={post?.photo}
                    alt="image 1"
                    className="w-100 rounded-3"
                    style={{ height: "25vh" }}
                  />
                </div>
              ))
              .reverse()
          ) : (
            <h1>Not Photo</h1>
          )}
        </div>
      </div>
      {showEditModal && (
        <EditProfile
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          myPhoto={userInfo.user.photo}
          myName={userInfo.user.name}
          myEmail={userInfo.user.email}
        />
      )}
      {showFollowersModal && (
        <ShowFollowersModal
          showFollowersModal={showFollowersModal}
          setShowFollowersModal={setShowFollowersModal}
          userId={userInfo.user._id}
        />
      )}
      {showFollowingModal && (
        <ShowFollowingModal
          showFollowingModal={showFollowingModal}
          setShowFollowingModal={setShowFollowingModal}
          userId={userInfo.user._id}
        />
      )}
    </div>
  );
};

export default Profile;
