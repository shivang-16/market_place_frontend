import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";
import { productReducer } from "./reducers/productReducers";

const store = configureStore({
  reducer: {
    user: userReducer,
    items: productReducer,
  },
});

export default store;
