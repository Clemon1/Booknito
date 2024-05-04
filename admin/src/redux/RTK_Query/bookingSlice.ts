import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IBooking {}
type BookingResponse = IBooking[];
// register slice
export const bookingApi = createApi({
  reducerPath: "bookingAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/v1/booking` }),
  tagTypes: ["booking"],
  endpoints: (build) => ({
    getAllBooking: build.query<BookingResponse, void>({
      query: () => `/`,
      providesTags: ["booking"],
    }),
    singleBooking: build.query<IBooking, string>({
      query: (id) => `/${id}`,
      providesTags: ["booking"],
    }),
  }),
});

export const { useGetAllBookingQuery, useSingleBookingQuery } = bookingApi;
