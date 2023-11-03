import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Navbar from "../Navbar/Navbar";
import "./home.scss";
import { useSelector, useDispatch } from "react-redux";
import Product from "../Product/Product";

const Home = () => {
  const { items } = useSelector((state) => state.items);
  const dispatch = useDispatch();

  return (
    <main>
      <Navbar />
      <Carousel className="carousel">
        <div>
          <img src="https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg" />
        </div>
        <div>
          <img src="https://m.media-amazon.com/images/I/61+eWlUa0zL._SX1500_.jpg" />
        </div>
        <div>
          <img src="https://m.media-amazon.com/images/I/71Ie3JXGfVL._SX3000_.jpg" />
        </div>
      </Carousel>

      <div className="trusted">
        <p>
          Trusted by over 1000 companies and thousands of learners around the
          world
        </p>
        <div className="brands">
          <img
            src="https://s.udemycdn.com/partner-logos/ou-v1/volkswagen.svg"
            alt=""
          />
          <img
            src="https://s.udemycdn.com/partner-logos/ou-v1/samsung.svg"
            alt=""
          />
          <img
            src="https://s.udemycdn.com/partner-logos/ou-v1/cisco.svg"
            alt=""
          />
          <img
            src="https://s.udemycdn.com/partner-logos/ou-v1/att.svg"
            alt=""
          />
        </div>
      </div>

      <div className="courses">
        <div className="header">
          <h2>Explore products</h2>
          <span>See more</span>
        </div>
        <div className="course-box-area">
          {items
            ? items.map((data) => {
                const { item_name, description, image, _id } = data;
                return (
                  <Product
                    key={_id}
                    itemId={_id}
                    image={image}
                    item_name={item_name}
                    description={description}
                  />
                );
              })
            : ""}
        </div>
      </div>
    </main>
  );
};

export default Home;
