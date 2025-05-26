import { IOrderDetail, OrderStatus, PaymentStatus } from "../pages/order/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../globals/types/types";
import { APIS } from "../globals/http";
import { AppDispatch } from "./store";

interface IProduct {
  productId: string;
  quantity: number;
  totalPrice?: number;
  orderStatus: Status;
  paymentId:string
  Payment?: {
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
  };
}
export interface IOrderItems extends IProduct {
  id: string;
  orderId: string;
}

export interface IOrder {
  status: Status;
  items: IOrderItems[];
  khaltiUrl: string | null;
  orderDetails: IOrderDetail[];
}

export enum PaymentMethod {
  Esewa = "esewa",
  Khalti = "khalti",
  Cod = "cod",
}

export interface IData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addressLine: string;
  city: string;
  street: string;
  zipcode: string;
  email: string;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  Shoe: IProduct[];
}

const initialState: IOrder = {
  status: Status.LOADING,
  items: [],
  khaltiUrl: null,
  orderDetails: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setItems(state: IOrder, action: PayloadAction<IOrderItems[]>) {
      state.items = action.payload;
    },
    setOrderDetails(state: IOrder, action: PayloadAction<IOrderDetail[]>) {
      state.orderDetails = action.payload;
    },
    setStatus(state: IOrder, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setKhaltiUrl(state: IOrder, action: PayloadAction<string>) {
      state.khaltiUrl = action.payload;
    },
    updateOrderStatusToCancel(
      state: IOrder,
      action: PayloadAction<{ orderId: string }>
    ) {
      const orderId = action.payload.orderId;
      // state.items.map((item)=>item.)
      // console.log(state.items,"ST")
      // const data =  state.orderDetails.map((order)=>order.orderId == orderId ? {...order, [order.Order.orderStatus] : OrderStatus.Cancelled} : order)
      const datas = state.orderDetails.find(
        (order) => order.orderId === orderId
      );
      if (datas && datas.Order) {
        datas.Order.orderStatus = OrderStatus.Cancelled;
      }
      // state.orderDetails = data
    },
    updateOrderStatusinSlice(
      state: IOrder,
      action: PayloadAction<{
        status: OrderStatus;
        userId: string;
        orderId: string;
      }>
    ) {
      const { status, orderId } = action.payload;
      const updateOrder = state.items.map((order) =>
        order.id == orderId
          ? { ...order, orderStatus: status as unknown as Status }
          : order
      );
      console.log(updateOrder, "UO");
      state.items = updateOrder;
    },
    updatePaymentStatusinSlice(
      state: IOrder,
      action: PayloadAction<{
        status: PaymentStatus;
        orderId: string;
        paymentId: string;
      }>
    ) {
      const { status, orderId } = action.payload;

      // Update in items array
      const updatedItems = state.items.map((item) =>
        item.orderId === orderId
          ? {
              ...item,
              Payment: {
                ...item.Payment,
                paymentStatus: status,
                paymentMethod: item.Payment?.paymentMethod ?? PaymentMethod.Cod, // Ensure paymentMethod is always defined
              },
            }
          : item
      );

      // Update in orderDetails array
      const updatedDetails = state.orderDetails.map((detail) => {
        if (detail.orderId === orderId && detail.Order) {
          return {
            ...detail,
            Order: {
              ...detail.Order,
              Payment: {
                ...detail.Order.Payment,
                paymentStatus: status,
              },
            },
          };
        }
        return detail;
      });

      state.items = updatedItems;
      state.orderDetails = updatedDetails;
    },
  },
});

export default orderSlice.reducer;
export const {
  setItems,
  setStatus,
  setKhaltiUrl,
  setOrderDetails,
  updateOrderStatusToCancel,
  updateOrderStatusinSlice,
  updatePaymentStatusinSlice
} = orderSlice.actions;

export function orderItem(data: IData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.post("/order", data);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
        console.log(response.data.url, "URL");
        if (response.data.url) {
          setKhaltiUrl(response.data.url);
          window.location.href = response.data.url;
        }
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
      console.log(error);
    }
  };
}

export function fetchMyOrders() {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.get("/order");
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setItems(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchMyOrderDetails(id: string) {
  return async function fetchMyOrderDetailsThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.get(`/order/${id}`);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setOrderDetails(response.data.data));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function cancelOrderAPI(id: string) {
  return async function cancelOrderAPIThunk(dispatch: AppDispatch) {
    try {
      const response = await APIS.patch("/order/cancel-order/" + id);
      if (response.status === 201) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(updateOrderStatusToCancel({ orderId: id }));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
