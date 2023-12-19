export interface ICartData {
  id: number;
  title: string;
  price: number;
  qtk: number;
}

export const cartData: ICartData[] = [
  {
    id: 1,
    title: "iPhone 14 pro max",
    price: 124,
    qtk: 10,
  },

  {
    id: 2,
    title: "mi 11 t lite",
    price: 100,
    qtk: 10,
  },
  {
    id: 3,
    title: "iPhone 12 pro max",
    price: 114,
    qtk: 10,
  },

  {
    id: 4,
    title: "laptop ",
    price: 114,

    qtk: 10,
  },
];
