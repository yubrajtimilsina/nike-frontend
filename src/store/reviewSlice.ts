import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { AppDispatch, RootState } from "./store";
import { API, APIS } from "../globals/http";
interface user {
  id: string | null;
  username: string | null;
}
export interface IData {
  id: string | null;
  productId: string | null;
  userId: string | null;
  comment: string | null;
  rating: number | null;
  createdAt: string | null;
  User: user;
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
  name: "reviews",
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

export function fetchReview(productId: string) {
  return async function fetchReviewThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const store = getState();
    const reviews = store.reviews.review.find(
      (review: IData) => review.id === productId
    );
    if (reviews) {
      dispatch(setReview([reviews]));
      dispatch(setStatus(Status.SUCCESS));
      return;
    }
    try {
      const res = await API.get(`/review/${productId}`);
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

export function createReview(data: IData) {
  return async function createReviewThunk(dispatch: AppDispatch) {
    try {
      const res = await APIS.post("/review", data);
      if (res.status === 200) {
        dispatch(setReview(res.data.data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}
