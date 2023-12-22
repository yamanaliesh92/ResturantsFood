import { api } from "./api";

export interface ICreateOrder {
  name: string;
  price: number;
  imgOrder: string;
  description: string;
  category: string;
  restaurantId: number;
}

export interface IUpdateOrder {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
}

export interface IResponseProduct {
  id: number;
  name: string;
  price: number;
  imgProduct: string;
  description: string;
  category: string;
  userId: number;
  restaurantId: number;
}
export interface IResponseOrder {
  id: number;
  name: string;
  price: number;
  imgOrder: string;
  description: string;
  category: string;
  userId: number;
  restaurantId: number;
}

export interface IPayloadUpdateOrder {
  id: number;
  payload: IUpdateOrder;
}

export interface IPayloadUpdateOrderImg {
  id: number;
  img: string;
}

export interface IPayloadGetAllProductByUserId {
  userId: number;
}

export interface QueryPayload {
  category: string;
}

export interface IPayloadDeleteProduct {
  id: number;
}

export interface IPayloadGetOneOrder {
  id: number;
}
export interface IPayloadUpdateImgOrder {
  id: number;
  imgProduct: string;
}

const product = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createOrder: builder.mutation<IResponseOrder, ICreateOrder>({
      query: (body) => ({
        method: "POST",
        url: "api/order/create",
        body: body,
      }),
      invalidatesTags: ["Order"],
    }),

    allOrders: builder.query<IResponseOrder[], any>({
      query: (body) => ({
        method: "GEt",
        url: "api/order/all",
      }),
    }),

    deleteOrder: builder.mutation<boolean, IPayloadDeleteProduct>({
      query: (body) => ({
        url: `/api/order/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrder: builder.mutation<boolean, IPayloadUpdateOrder>({
      query: (body) => ({
        method: "PATCH",
        url: `/api/order/update/${body.id}`,
        body: body.payload,
      }),
      invalidatesTags: ["Order"],
    }),

    updateOrderImg: builder.mutation<boolean, IPayloadUpdateOrderImg>({
      query: (body) => ({
        method: "PATCH",
        url: `/api/order/update/img/${body.id}`,
        body: body.img,
      }),
      invalidatesTags: ["Order"],
    }),

    getOneOrder: builder.query<IResponseOrder, IPayloadGetOneOrder>({
      query: (body) => ({
        method: "GET",
        url: `/api/order/get/${body.id}`,
      }),
    }),

    getOrderByCategory: builder.query<IResponseOrder[], { category: string }>({
      query: (body) => ({
        method: "GET",
        url: `/api/order?category=${body.category}`,
      }),
    }),

    getAllOrdersByUserId: builder.query<IResponseOrder[], any>({
      query: () => ({
        method: "GET",
        url: "api/order/userId",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ name }) => ({
                type: "Order" as const,
                name,
              })),
              { type: "Order", id: "LIST" },
            ]
          : [{ id: "LIST", type: "Order" }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersByUserIdQuery,
  useUpdateOrderMutation,
  useAllOrdersQuery,
  useUpdateOrderImgMutation,
  useGetOneOrderQuery,
  useGetOrderByCategoryQuery,
  useDeleteOrderMutation,
} = product;
