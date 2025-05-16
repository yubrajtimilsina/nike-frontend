export enum OrderStatus {
  Preparation = "preparation",
  Ontheway = "ontheway",
  Delivered = "delivered",
  Pending = "pending",
  Cancelled = "cancelled",
}

export enum PaymentMethod {
  Khalti = "khalti",
  Esewa = "esewa",
  COD = "cod",
}

export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}

export interface IOrderDetail {
  id: string;
  quantity: number;
  createdAt: string;
  orderId: string;
  productId: string;

  orders: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    street: string;
    zipcode: string;
    status: OrderStatus;
    email: string;
    totalPrice: number;

    payments: {
      paymentMethod: PaymentMethod;
      paymentStatus: PaymentStatus;
    };
  };

  shoes: {
    images: string;
    name: string;
    price: number;
    categories: {
      categoryName: string;
    };
  };
}
