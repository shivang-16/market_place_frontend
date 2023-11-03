import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./signin.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../action/userAction";

const Login = ({setProgress}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogin = async(e) => {
    setProgress(10)
    e.preventDefault();
    await dispatch(loginUser(email, password));
    setProgress(100)
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div id="signin_page">
      <div className="signin-box">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter you email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter you password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="checkbox" id="" />
          <input type="submit" id="" value="Login" />
          <p>
            Didn't have account? <Link to="/register">SignUp</Link>
          </p>
        </form>
        <form>
          <input type="text" placeholder="Login with google" />
          <input type="text" placeholder="Login with github" />
        </form>
      </div>
    </div>
  );
};

export default Login;
