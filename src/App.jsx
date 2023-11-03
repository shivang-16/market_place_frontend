import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/SignIn/Login";
import Signup from "./components/SignIn/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import Biding from "./components/Live_Biding/Biding";
import Footer from "./components/Footer/Footer";
import "./app.scss";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./action/userAction";
import { getProducts } from "./action/productAction";
import Cart from "./components/Cart/Cart";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/register"
          element={isAuthenticated ? <Home /> : <Signup />}
        />
        <Route
          exact
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Login />}
        />
        <Route
          exact
          path="/cart"
          element={isAuthenticated ? <Cart /> : <Login />}
        />
        <Route
          exact
          path="/bid"
          element={isAuthenticated ? <Biding /> : <Login />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
