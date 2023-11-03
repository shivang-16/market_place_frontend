import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
};

export const productReducer = createReducer(initialState, {
  CreateRequest: (state) => {
    state.loading = true;
  },
  CreateSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CreateFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  GetProductsRequest: (state) => {
    state.loading = true;
  },
  GetProductsSuccess: (state, action) => {
    state.loading = false;
    state.items = action.payload;
  },
  GetProductsFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const cartReducer = createReducer(initialState, {
  AddRequest: (state) => {
    state.loading = true;
  },
  AddSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  AddFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  EditRequest: (state) => {
    state.loading = true;
  },
  EditSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  EditFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  DeleteRequest: (state) => {
    state.loading = true;
  },
  DeleteSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

export const paymentReducer = createReducer(initialState, {
  CheckoutRequest: (state) => {
    state.loading = true;
  },
  CheckoutSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  CheckoutFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
