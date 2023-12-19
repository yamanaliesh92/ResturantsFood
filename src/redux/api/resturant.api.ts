import { api } from "./api";
import { IResponseEvent } from "./event.api";
import { IResponseOrder } from "./order.api";

export interface ICreateRestaurant {
  name: string;
  address: string;
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
} = Restaurant;
