import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { APIS } from "../globals/http";
import { AppDispatch } from "./store";

export interface IData {
  id: string | null;
  productId: string | null;
  userId: string | null;
  comment: string | null;
  rating: number | null;
  createdAt: string | null;
}
export interface IReview {
  review: IData[];
  status: Status;
}

const initialState: IReview = {
  review: [],
  status: Status.LOADING,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview(state: IReview, action: PayloadAction<IData[]>) {
      state.review = action.payload;
    },
    setStatus(state: IReview, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
  },
});

export const { setReview, setStatus } = reviewSlice.actions;
export default reviewSlice.reducer;

export function fetchReview(id: string) {
  return async function fetchReviewThunk(dispatch: AppDispatch) {
    try {
      const res = await APIS(`http://localhost:5001/reviews/${id}`);

      if (res.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setReview(res.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
