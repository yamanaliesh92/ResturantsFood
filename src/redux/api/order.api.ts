import { api } from "./api";
import { SerializedError } from "@reduxjs/toolkit";
import { IError } from "./api.common";

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
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Order" }],
    }),

    allOrders: builder.query<IResponseOrder[], any>({
      query: (body) => ({
        method: "GEt",
        url: "api/order/all",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
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

    deleteOrder: builder.mutation<boolean, IPayloadDeleteProduct>({
      query: (body) => ({
        url: `/api/order/${body.id}`,
        method: "DELETE",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },

      invalidatesTags: [{ id: "LIST", type: "Order" }],
    }),

    updateOrder: builder.mutation<boolean, IPayloadUpdateOrder>({
      query: (body) => ({
        method: "PATCH",
        url: `/api/order/update/${body.id}`,
        body: body.payload,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Order" }],
    }),

    updateOrderImg: builder.mutation<boolean, IPayloadUpdateOrderImg>({
      query: (body) => ({
        method: "PATCH",
        url: `/api/order/update/img/${body.id}`,
        body: body.img,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Order" }],
    }),

    getOneOrder: builder.query<IResponseOrder, IPayloadGetOneOrder>({
      query: (body) => ({
        method: "GET",
        url: `/api/order/get/${body.id}`,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),

    getOrderByCategory: builder.query<IResponseOrder[], { category: string }>({
      query: (body) => ({
        method: "GET",
        url: `/api/order?category=${body.category}`,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),

    getAllOrdersByUserId: builder.query<IResponseOrder[], any>({
      query: () => ({
        method: "GET",
        url: "api/order/userId",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as { message: string })?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
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
