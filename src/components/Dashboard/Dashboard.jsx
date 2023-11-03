import React, { useState } from "react";
import "./dashboard.scss";
import "./popup.scss";
import userImg from "../../assets/user.png";
import { DoughnutChart } from "../Charts/Charts";
import imageicon from "../../assets/image.png";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../action/productAction";
import { getProducts } from "../../action/productAction";
import { loadUser } from "../../action/userAction";
import { logoutUser } from "../../action/userAction";
import Navbar from "../Navbar/Navbar";
import { deleteItem } from "../../action/productAction";

const Dashboard = ({setProgress}) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState("");
  const [item_name, setItem_name] = useState("");
  const [overview, setOverview] = useState("");
  const [price, setPrice] = useState("");
  const [editItem_name, setEditItem_name] = useState("");
  const [editOverview, setEditOverview] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const dispatch = useDispatch();
  const openPopup = () => {
    setPopupOpen(true);
  };
  const openEdit = () => {
    setIsEditOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
    setIsEditOpen(false);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleAddProduct = async (e) => {
    setProgress(10)
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("item_name", item_name);
    formdata.append("overview", overview);
    formdata.append("price", price);
    formdata.append("file", image);

    setProgress(50)

    await dispatch(createProduct(formdata));

    setProgress(70)

    dispatch(loadUser());
    dispatch(getProducts());
    setPopupOpen(false);
    setItem_name("");
    setOverview("");
    setPrice("");
    setImage("");
    setImagePreview("");

    setProgress(100)
  };

  const handleDelete = async (itemId) => {
    setProgress(10)
    await dispatch(deleteItem(itemId));
    setProgress(60)
    dispatch(loadUser());
    dispatch(getProducts());
    setProgress(100)
  };

  const handleEdit = async (itemId) => {};

  return (
    <main>
      <Navbar />
      <div className="dashboard">
        <div className="profile">
          <div className="avatar">
            <img src={userImg} alt="" />
          </div>
          <div className="details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <div className="product_btn">
              <button onClick={openPopup}>Add Products</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="chart">
            <DoughnutChart />
          </div>
        </div>
        <div className="dashboard_products">
          <h3>My Products</h3>
          <div className="course-box-area">
            {user && user.products && user.products.length > 0 ? (
              user.products.map((data) => {
                const { item_name, description, image, _id } = data;
                return (
                  <>
                    <div className="my_product">
                      <div className="image_box">
                        <img src={image.url} alt="" />
                      </div>
                      <div className="my_product_detail">
                        <p>{item_name}</p>
                        <p>{description?.overview}</p>
                        <p>{description?.price}</p>
                      </div>
                      <div className="product_btn my_product_btn">
                        <button onClick={openEdit}>Edit</button>
                        <button onClick={() => handleDelete(_id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <p>No items</p>
            )}
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head">
              <h2>Add Product</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Product name"
                value={item_name}
                onChange={(e) => setItem_name(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Product Description"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <div className="popup-foot">
                <label htmlFor="fileInput" className="custom-file-input-label">
                  <img src={imageicon} />
                </label>
                <input type="file" id="fileInput" onChange={imageHandler} />
                <button>Add</button>
              </div>
              <div className="preview-image">
                {imagePreview && <img src={imagePreview} alt="Image Preview" />}
              </div>
            </form>
          </div>
        </div>
      )}
      {isEditOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className="popup-head">
              <h2>Edit Product</h2>
            </div>
            <span className="close-icon" onClick={closePopup}>
              &times;
            </span>
            <form onSubmit={handleEdit}>
              <input
                type="text"
                placeholder="Product name"
                value={editItem_name}
                onChange={(e) => setEditItem_name(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Product Description"
                value={editOverview}
                onChange={(e) => setEditOverview(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                required
              />
              <div className="popup-foot">
                <button>Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
