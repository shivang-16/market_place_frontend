import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../action/userAction";
import { getProducts } from "../../action/productAction";

const Signup = ({setProgress}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch(); const { isAuthenticated } = useSelector((state) => state.user);

  const handleSignup = async(e) => {
    setProgress(10)
    e.preventDefault();
    await dispatch(registerUser(name, email, password));
    setProgress(60);
    await dispatch(getProducts())
    setProgress(100)

  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div id="signin_page">
      <div className="signin-box">
        <h2>Welcome to CourseWave</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter you name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter you email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter you password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="checkbox" id="" />
          <input type="submit" id="" value="Signup" />
          <p>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </form>
        <form>
          <input type="text" placeholder="Signup with google" />
          <input type="text" placeholder="Signup with github" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
