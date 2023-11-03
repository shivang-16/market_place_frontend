import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
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
import LoadingBar from "react-top-loading-bar";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [progress, setProgress] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Router>
        <LoadingBar
        color='#E29105'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login setProgress={setProgress}/>} />
        <Route
          exact
          path="/register"
          element={isAuthenticated ? <Home /> : <Signup  setProgress={setProgress}/>}
        />
        <Route
          exact
          path="/dashboard"
          element={isAuthenticated ? <Dashboard  setProgress={setProgress}/> : <Login />}
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
