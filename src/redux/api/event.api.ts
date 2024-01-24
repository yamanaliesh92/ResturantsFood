import { SerializedError } from "@reduxjs/toolkit";
import { api } from "./api";
import { IError } from "./api.common";

export interface ICreateEvent {
  name: string;
  newPrice: number;
  oldPrice: number;
  imgOrder: string;
  description: string;
  category: string;
  date: Date;
  restaurantId: number;
}

export interface IResponseEvent {
  id: number;
  name: string;
  oldPrice: number;
  date: Date;
  newPrice: number;
  imgOrder: string;
  description: string;
  category: string;
  userId: number;
  restaurantId: number;
}

export interface IPayloadUpdateEvent {
  name?: string;
  oldPrice?: number;
  date?: string | null;
  newPrice?: number;
  description?: string;
  category?: string;
}

export interface IPayloadUpdate {
  payload?: IPayloadUpdateEvent;
  id: number;
}

export interface IPayloadUpdateImgEvent {
  id: number;
  img: string;
}

export interface IPayloadDeleteEvent {
  id: number;
}

const Event = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createEvent: builder.mutation<IResponseEvent, ICreateEvent>({
      query: (body) => ({
        method: "POST",
        url: "/api/event",
        body: body,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Event" }],
    }),

    AllEvent: builder.query<IResponseEvent[], any>({
      query: (body) => ({
        method: "GET",
        url: "api/events/all",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
    }),

    MyEvents: builder.query<IResponseEvent[], any>({
      query: (body) => ({
        method: "GET",
        url: "api/event",
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ name }) => ({
                type: "Event" as const,
                name,
              })),
              { type: "Event", id: "LIST" },
            ]
          : [{ id: "LIST", type: "Event" }],
    }),

    updateEvent: builder.mutation<boolean, IPayloadUpdate>({
      query: (body) => ({
        method: "PATCH",
        body: body.payload,
        url: `api/events/update/${body.id}`,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Event" }],
    }),

    updateEventImg: builder.mutation<boolean, IPayloadUpdateImgEvent>({
      query: (body) => ({
        method: "PATCH",
        url: `/api/events/update/img/${body.id}`,
        body: body.img,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Event" }],
    }),

    deleteEvent: builder.mutation<boolean, IPayloadDeleteEvent>({
      query: (body) => ({
        method: "DELETE",
        url: `api/events/${body.id}`,
      }),
      transformErrorResponse: (err): SerializedError => {
        return (err.data as IError)?.message
          ? { message: (err.data as IError)?.message }
          : { message: "default" };
      },
      invalidatesTags: [{ id: "LIST", type: "Event" }],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useAllEventQuery,
  useUpdateEventMutation,
  useUpdateEventImgMutation,
  useDeleteEventMutation,
  useMyEventsQuery,
} = Event;
