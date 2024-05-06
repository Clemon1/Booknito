import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IBooking {
  guestName: string;
  roomId: string;
  price: number;
  email: string;
  checkIN: Date;
  checkOUT: Date;
  numOfGuest: number;
  adults: number;
  children: number;
}
interface IRevenue {
  total: number;
}
type BookingResponse = IBooking[];
// register slice
export const bookingApi = createApi({
  reducerPath: "bookingAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/v1/booking` }),
  tagTypes: ["booking"],
  endpoints: (build) => ({
    getAllBooking: build.query<BookingResponse, void>({
      query: () => `/viewBooking`,
      providesTags: ["booking"],
    }),
    getBookingRevenue: build.query<IRevenue, void>({
      query: () => `/revenue`,
      providesTags: ["booking"],
    }),
    singleBooking: build.query<IBooking, string>({
      query: (id) => `/viewBooking/${id}`,
      providesTags: ["booking"],
    }),
    createBooking: build.mutation<IBooking, Partial<IBooking>>({
      query(body) {
        return {
          url: `/createBooking`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useGetAllBookingQuery,
  useGetBookingRevenueQuery,
  useSingleBookingQuery,
  useCreateBookingMutation,
} = bookingApi;
