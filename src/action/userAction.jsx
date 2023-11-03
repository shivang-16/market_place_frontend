import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main";

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "RegisterRequest",
    });

    const { data } = await axios.post(
      `${server}/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    dispatch({
      type: "RegisterSuccess",
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "RegisterFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });
    const { data } = await axios.post(
      `${server}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    );
    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "LoginFaliure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get(`${server}/user/profile`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutRequest",
    });

    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutSuccess",
      payload: data.message,
    });
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "LogoutFailure",
      payload: error.response.data.message,
    });
    toast.error(error.response.data.message);
  }
};
