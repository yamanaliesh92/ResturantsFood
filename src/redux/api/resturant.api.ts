import { api } from "./api";
import { IResponseEvent } from "./event.api";
import { IResponseOrder } from "./order.api";
import { IPayloadUpdateUsernameUser } from "./user.api";

export interface ICreateRestaurant {
  name: string;
  address: string;
}

export interface IUpdate {
  name?: string;
  address?: string;
}

export interface IUpdateRestaurant {
  id: number;
  payload: IUpdate;
}

export interface IResponseRestaurant {
  id: number;
  name: string;
  address: string;
  userId: number;
  orders: IResponseOrder[];
  events: IResponseEvent[];
}

export interface IPayloadGetOneRestaurant {
  id: number;
}

export interface IResponseGetOneRestaurant {
  dataRes: IResponseRestaurant;
}

const Restaurant = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createRestaurant: builder.mutation<IResponseRestaurant, ICreateRestaurant>({
      query: (body) => ({
        method: "POST",
        url: "/api/restaurant/create",
        body: body,
      }),
      invalidatesTags: ["Restaurant"],
    }),
    AllRestaurant: builder.query<IResponseRestaurant[], any>({
      query: (body) => ({
        method: "GET",
        url: "api/restaurants/all",
      }),
    }),

    updateRestaurantInfo: builder.mutation<boolean, IUpdateRestaurant>({
      query: (body) => ({
        method: "PATCH",
        body: body.payload,
        url: `/api/restaurant/update/${body.id}`,
      }),

      invalidatesTags: ["Restaurant"],
    }),

    getOneRestaurant: builder.query<
      IResponseRestaurant,
      IPayloadGetOneRestaurant
    >({
      query: (body) => ({
        method: "GET",
        url: `/api/auth/restaurant/${body.id}`,
      }),
    }),
  }),
});

export const {
  useCreateRestaurantMutation,
  useAllRestaurantQuery,
  useGetOneRestaurantQuery,
  useUpdateRestaurantInfoMutation,
} = Restaurant;
