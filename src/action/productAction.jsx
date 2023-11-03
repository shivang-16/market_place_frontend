import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";
import userImg from "../assets/user.png";

export const createProduct = (formdata) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateRequest",
    });

    const { data } = await axios.post(`${server}/product/create`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({
      type: "CreateSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "CreateFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/all`, {
      withCredentials: true,
    });
    dispatch({
      type: "GetProductsSuccess",
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: "GetProductsFailure",
      payload: error.response.data.message,
    });
  }
};

export const addToCart = (itemId) => async (dispatch) => {
  try {
    dispatch({
      type: "AddRequest",
    });

    const { data } = await axios.get(`${server}/product/${itemId}`, {
      withCredentials: true,
    });
    dispatch({
      type: "AddSuccess",
      payload: data.items,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "AddFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const editProduct = (item_name, overview, price) => async (dispatch) => {
  try {
    dispatch({
      type: "EditRequest",
    });

    const { data } = await axios.post(
      `${server}/product/create`,
      {
        item_name,
        overview,
        price,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    dispatch({
      type: "EditSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "EditFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
export const deleteItem = (itemId) => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteRequest",
    });

    const { data } = await axios.delete(`${server}/product/${itemId}`, {
      withCredentials: true,
    });
    dispatch({
      type: "DeleteSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "DeleteFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const checkout = (itemId) => async (dispatch) => {
  try {
    dispatch({
      type: "CheckoutRequest",
    });

    const { data } = await axios.get(`${server}/product/payment/${itemId}`, {
      withCredentials: true,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_API_KEY,
      amount: data.order.amount,
      currency: "INR",
      name: "Pacific",
      description: "Test Transaction",
      image: { userImg },
      order_id: data.order.id,
      callback_url: `${server}/product/paymentVerification`,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#9B870C",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();

    dispatch({
      type: "CheckoutSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "CheckoutFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
