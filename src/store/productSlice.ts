import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProducts, Status } from "../globals/types/types";
import { AppDispatch, RootState } from "./store";
import axios from "axios";
import { API } from "../globals/http";

const initialState: IProducts = {
  products: [],
  status: Status.LOADING,
  product: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state: IProducts, action: PayloadAction<IProduct[]>) {
      state.products = action.payload;
    },
    setStatus(state: IProducts, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setProduct(state: IProducts, action: PayloadAction<IProduct>) {
      state.product = action.payload;
    },
  },
});
export const { setProducts, setStatus, setProduct } = productSlice.actions;
export default productSlice.reducer;

export function fetchProducts() {
  return async function fetchProductsThunk(dispatch: AppDispatch) {
    try {
      const res = await API.get("/product");
      if (res.status === 201) {
        dispatch(setStatus(Status.SUCCESS));

        dispatch(setProducts(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchProduct(id: string) {
  return async function fetchProductThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const store = getState();
    const productExits = store.products.products.find(
      (product: IProduct) => product.id === id
    );
    if (productExits) {
      dispatch(setProduct(productExits));
      dispatch(setStatus(Status.SUCCESS));
      return;
    }
    try {
      const res = await axios.get(`/product/${id}`);
      if (res.status === 201) {
        dispatch(setStatus(Status.SUCCESS));

        dispatch(setProduct(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
