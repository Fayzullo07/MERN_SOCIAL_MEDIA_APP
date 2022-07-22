import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addComment,
  deletePost,
  getAllPosts,
  likePost,
  unLikePost,
} from "../../Redux/Actions/PostsActions";
import HomeRSideUsers from "./HomeRSideUsers";
import moment from "moment";
import SkeletonLoading from "../../Untils/SkeletLoading";
import Comments from "./Comments";

import { POST_CHANGE_COMMENT } from "../../Redux/Constants/PostsConstants";

const Home = () => {
  const dispatch = useDispatch();

  const getALLPosts = useSelector((state) => state.posts);
  const { posts } = getALLPosts;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 px-md-5 my-2">
          {posts ? (
            posts
              ?.map((post) => (
                <div className="card m-lg-5 my-3 bg-dark" key={post._id}>
                  <div className="card-body d-flex flex-row">
                    <Link
                      to={
                        post?.postedBy?._id !== userInfo?.user?._id
                          ? `/profile/${post?.postedBy?._id}`
                          : "/profile"
                      }
                    >
                      <img
                        src={post?.postedBy?.photo}
                        className="rounded-circle me-3 border"
                        height="50px"
                        width="50px"
                        alt="user"
                      />
                    </Link>
                    <div>
                      <h5 className="card-title font-weight-bold text-white mb-2">
                        {post?.postedBy?.name}
                      </h5>
                      <p className="card-text text-white">
                        <i className="far fa-clock pe-2"></i>
                        {post?.createdAt
                          ? moment(post?.createdAt).fromNow()
                          : null}
                      </p>
                    </div>
                  </div>

                  <div className="bg-image hover-overlay ripple rounded-0">
                    {post.likes.includes(userInfo.user._id) ? (
                      <img
                        onDoubleClick={() => {
                          dispatch(unLikePost(post._id, userInfo.user._id));
                        }}
                        className="w-100"
                        src={post.photo}
                        alt="Card image cap"
                      />
                    ) : (
                      <img
                        onDoubleClick={() => {
                          dispatch(likePost(post._id, userInfo.user._id));
                        }}
                        className="w-100"
                        src={post.photo}
                        alt="Card image cap"
                      />
                    )}
                  </div>

                  <div className="card-body position-relative">
                    <div className="d-flex justify-content-between">
                      <div>
                        {post.likes.includes(userInfo.user._id) ? (
                          <i
                            className="fas fa-heart p-md-1 my-1 me-4 fs-3"
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => {
                              dispatch(unLikePost(post._id, userInfo.user._id));
                            }}
                            title="I dislike it"
                          ></i>
                        ) : (
                          <i
                            className="far fa-heart p-md-1 my-1 me-4 fs-3"
                            style={{ color: "white", cursor: "pointer" }}
                            onClick={() => {
                              dispatch(likePost(post._id, userInfo.user._id));
                            }}
                            title="I like it"
                          ></i>
                        )}
                        <i
                          onClick={() => {
                            dispatch({
                              type: POST_CHANGE_COMMENT,
                              payload: post._id,
                            });
                          }}
                          className={`${
                            post.comment ? "far" : "fas"
                          } fa-comment-alt p-md-1 my-1 me-4 fs-4`}
                          style={{ color: "green", cursor: "pointer" }}
                          title="Comment this post"
                        ></i>
                        {post?.postedBy?._id == userInfo?.user?._id && (
                          <i
                            onClick={() => {
                              dispatch(deletePost(post._id));
                            }}
                            className="far fa-trash-alt text-danger p-md-1 my-1 me-2 fs-4"
                            title="Delete this post"
                          ></i>
                        )}
                      </div>
                      <span className="position-absolute bottom-0 fst-italic text-muted">
                        <b>{post && post?.likes?.length}</b> likes
                      </span>
                    </div>
                  </div>

                  <div className="card-body">
                    <h2 className="card-title text-white">{post.title}</h2>
                    <p className="card-text text-white">{post.descr}</p>
                  </div>
                  {!post.comment ? (
                    <p className="card-body py-0 text-muted">
                      Comments:{" "}
                      {posts && post?.comments ? post?.comments?.length : 0}
                    </p>
                  ) : (
                    <Comments
                      comments={post.comments}
                      myId={userInfo?.user?._id}
                      postId={post._id}
                    />
                  )}
                </div>
              ))
              .reverse()
          ) : (
            <SkeletonLoading height={600} count={5} rodius={10} />
          )}
        </div>
        <div className="col-lg-4 d-none d-lg-block">
          <div
            className="container my-lg-5 sticky-top overflow-auto"
            style={{ top: "5vh", height: "90vh" }}
          >
            <HomeRSideUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
