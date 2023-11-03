import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { useSelector } from "react-redux";
import logo from "../../assets/amazon.png";
import searchIcon from "../../assets/search-icon.png";
import cartIcon from "../../assets/cart.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="nav-belt">
        <div className="nav-left">
          <Link to="/">
            <div className="nav-box nav-left-box nav-box1">
              <h2>Pacific</h2>
            </div>
          </Link>
        </div>
        <div className="nav-mid">
          <div className="nav-box nav-mid-box nav-box4">
            <input type="text" className="nav-search" placeholder="Search" />
          </div>
          <div className="nav-box nav-mid-box nav-box5">
            <mg src={searchIcon} alt="search" />
          </div>
        </div>
        <div className="nav-right">
          <Link to="/bid">
            <div className="nav-box nav-right-box nav-box9">
              <h3>LiveBid</h3>
            </div>
          </Link>
          <div className="nav-box nav-right-box nav-box7">
            {isAuthenticated ? (
              <Link to="/dashboard">Dashboard</Link>
            ) : (
              <Link to="/login">
                Hello, <span>SignIn</span>
              </Link>
            )}
          </div>
          <Link to="/cart">
            <div className="nav-box nav-right-box nav-box9">
              <div className="cart_number">{user?.cart.length}</div>
              <img src={cartIcon} alt="" />
            </div>
          </Link>
        </div>
      </nav>

      <nav className="nav-belt-mini">
        <div className="nav-mini-left nav-mini-box">
          <div className="burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <span>
            <strong>All</strong>
          </span>
        </div>
        <div className="nav-mini-mid">
          <div className="nav-mini-mid-box1 nav-mini-mid-box">
            Amazon miniTV
          </div>
          <div className="nav-mini-mid-box2 nav-mini-mid-box">Sell</div>
          <div className="nav-mini-mid-box3 nav-mini-mid-box">Best Sellers</div>
          <div className="nav-mini-mid-box4 nav-mini-mid-box">Mobiles</div>
          <div className="nav-mini-mid-box5 nav-mini-mid-box">
            Today's Deals
          </div>
          <div className="nav-mini-mid-box6 nav-mini-mid-box">
            Customer Service
          </div>
          <div className="nav-mini-mid-box7 nav-mini-mid-box">New Releases</div>
          <div className="nav-mini-mid-box8 nav-mini-mid-box">Electronics</div>
          <div className="nav-mini-mid-box9 nav-mini-mid-box dropdown-icon">
            Prime &#9662;
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
