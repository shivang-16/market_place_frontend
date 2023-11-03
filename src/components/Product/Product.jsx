import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../action/productAction";
import { checkout } from "../../action/productAction";
import { loadUser } from "../../action/userAction";
import "./product.scss";

const Product = ({ item_name, description, image, itemId }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleCart = async () => {
    await dispatch(addToCart(itemId));
    dispatch(loadUser());
  };

  const handleCheckout = () => {
    dispatch(checkout(itemId));
  };

  const isAddedtoCart =
    user && user.cart && user.cart.some((item) => item._id === itemId);

  return (
    <div className="course-box">
      <img src={image?.url} />
      <div className="course-content">
        <h3>{item_name}</h3>
        <p>{description?.overview}</p>
        <p>{description?.price}</p>
      </div>
      <div className="product_btn">
        <button onClick={handleCheckout}>Buy now</button>
        <button onClick={handleCart}>
          {isAddedtoCart ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};

export default Product;
