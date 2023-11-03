import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";
import "./bidding.scss";

const socket = io.connect(import.meta.env.VITE_WEBSOCKET_SERVER);

const Biding = () => {
  const { user } = useSelector((state) => state.user);
  const [bid, setBid] = useState([]);
  const [socketId, setScoketId] = useState("");

  const sendBid = (e) => {
    e.preventDefault();
    const message = document.getElementById("bidInput").value;
    socket.emit("bid", {
      user: user.name,
      message,
      socketId,
    });
  };

  useEffect(() => {
    socket.emit("joined", { user: user.name }, (socketid) => {
      setScoketId(socketid);
    });
    socket.on("bid", (payload) => {
      setBid((prevBid) => [...prevBid, payload]);
      setImmediate(socket.id);
    });
    socket.on("userJoined", (payload) => {
      setBid((prevBid) => [...prevBid, payload]);
    });

    socket.on("leave", (payload) => {
      setBid((prevChat) => [...prevChat, payload]);
    });

    return () => {
      // socket.emit("disconnect");
      socket.off();
    };
  }, []);

  return (
    <main>
      <div className="chat-box">
        <div className="chat-header">
          <Link to="/">
            <span>{"< Back"}</span>
          </Link>
          <h2>
            Welcome to the Live Biding <span className="name">{user.name}</span>
          </h2>
        </div>
        <ReactScrollToBottom className="chat-content">
          {bid.map((payload, index) => {
            return (
              <Message
                key={index}
                user={payload?.socketId === socketId ? "" : payload.user}
                message={payload.message}
                messageClass={payload.socketId === socketId ? "right" : "left"}
              />
            );
          })}
        </ReactScrollToBottom>
        <div className="send-box">
          <form onSubmit={sendBid}>
            <input type="text" placeholder="Enter bid" id="bidInput" />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </main>
  );
};

export default Biding;
