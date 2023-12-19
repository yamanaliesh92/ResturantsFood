interface IOrder {
  id: number;
  totalPrice: number;
  name: string;
  orderStatus: string;
}

export const orderData: IOrder[] = [
  {
    id: 1,
    name: "IPhone pro max 12",
    totalPrice: 121,
    orderStatus: "proccesing",
  },
  {
    id: 2,
    name: "IPhone 12",
    totalPrice: 32,
    orderStatus: "proccesing",
  },
  {
    id: 3,
    name: "labTop Apple",
    totalPrice: 1221,
    orderStatus: "Lab",
  },
  {
    id: 4,
    name: "IPhone pro max 14",
    totalPrice: 11,
    orderStatus: "proccesing",
  },
  {
    id: 5,
    name: "IPhone  11",
    totalPrice: 21,
    orderStatus: "proccesing",
  },
];
