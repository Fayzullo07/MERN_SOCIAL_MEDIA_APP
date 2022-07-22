import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";

// SOCKET.IO CLIENT
import io from "socket.io-client";
import { addComment } from "../../Redux/Actions/PostsActions";
const socket = io.connect("http://localhost:5000");

const Comments = (props) => {
  const { comments, myId, postId } = props;
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit("join_room", postId);
  }, []);

  const commentHandle = async () => {
    if (!message.trim()) {
      toast.warning("Enter comment!");
      return;
    }
    if (message !== "") {
      const messageData = {
        room: postId,
        message,
      };

      await socket.emit("send_message", messageData);
      dispatch(addComment(postId, message));
      setMessage("");
    }
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      dispatch(addComment(postId, data));
    });
  }, [socket]);
  return (
    <>
      <div className="overflow-auto">
        {comments.length !== 0 ? (
          <div style={{ height: "50vh" }}>
            <ScrollToBottom className="ps-3 message-container">
              {comments.map((comment, i) => {
                return (
                  <div
                    className={`${
                      comment.sender._id === myId && "flex-row-reverse"
                    } d-flex mb-4`}
                    key={i}
                  >
                    <Link
                      to={
                        comment.sender._id === myId
                          ? `/profile`
                          : `/profile/${comment.sender._id}`
                      }
                      className="h-25"
                    >
                      <img
                        src={comment.sender.photo}
                        alt={comment.sender.name}
                        className="rounded-circle d-flex align-self-start mx-3 border"
                        width="60"
                        height="60"
                      />
                    </Link>
                    <div
                      className={`${
                        comment.sender._id === myId ? "bg-info" : "bg-primary"
                      } card mask-custom w-100`}
                    >
                      <div
                        className={`${
                          comment.sender._id === myId && "flex-row-reverse"
                        } card-header d-lg-flex d-md-flex d-sm-flex justify-content-between p-3`}
                        style={{
                          borderBottom:
                            "1px solid rgba(255,255,255,.3) !important",
                        }}
                      >
                        <p className="fw-bold mb-0">{comment.sender.name}</p>
                        <p className="text-light small mb-0">
                          <i className="far fa-clock"></i>{" "}
                          {comment?.createdAt
                            ? moment(comment?.createdAt).format("lll")
                            : null}
                        </p>
                      </div>
                      <div className="card-body">
                        <p className="mb-0">{comment?.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
          </div>
        ) : (
          <h5 className="text-white px-4">Comments not yet</h5>
        )}
      </div>
      <div className="input-group">
        <input
          className="form-control"
          placeholder="Enter a comment here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              commentHandle();
            }
          }}
        ></input>
        <button className="btn btn-outline-primary" onClick={commentHandle}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </>
  );
};

export default Comments;
