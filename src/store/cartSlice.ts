import { AppDispatch } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, Status } from "../globals/types/types";
import { APIS } from "../globals/http";

interface IData {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  product: IProduct;
}
interface ICartUpdateItem {
  productId: string;
  quantity: number;
}
interface IInitialData {
  data: IData[];
  status: Status;
}
const initialState: IInitialData = {
  data: [],
  status: Status.LOADING,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state: IInitialData, action: PayloadAction<IData[]>) {
      state.data = action.payload;
    },
    setStatus(state: IInitialData, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setUpdateCart(state: IInitialData, action: PayloadAction<ICartUpdateItem>) {
      const index = state.data.findIndex(
        (i) => i.product.id === action.payload.productId
      );
      if (index !== -1) {
        state.data[index].quantity = action.payload;
      }
    },
    setDeleteCartItem(state: IInitialData, action: PayloadAction<string>) {
      const index = state.data.findIndex((i) => i.product.id == action.payload);
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});

export const { setCart, setStatus, setUpdateCart } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    try {
      const res = await APIS.post("/cart", {
        productId: productId,
        quantity: 1,
      });
      if (res.status == 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setCart(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function fetchCartItems(){
    return async function fetchCartItemsThunk(dispatch:AppDispatch){
        try {
            const response = await APIS.get("/cart")
            if(response.status === 200){
                dispatch(setCart(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}
