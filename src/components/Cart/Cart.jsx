import React from "react";
import Product from "../Product/Product";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

const Cart = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <main>
      <Navbar />
      <div className="course-box-area">
        {user && user.cart && user.cart.length > 0 ? (
          user.cart.map((data) => {
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
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </main>
  );
};

export default Cart;
