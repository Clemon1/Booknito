import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IRoom {
  roomNumber: string;
  description: string;
  photos?: Array<string>;
  perks?: Array<string>;
  roomType: string;
  price: number;
  maxGuest: number;
}
type roomResponse = IRoom[];
// register slice
export const roomApi = createApi({
  reducerPath: "roomAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/v1/rooms` }),
  tagTypes: ["room"],
  endpoints: (build) => ({
    getAllRoom: build.query<roomResponse, void>({
      query: () => `/viewRooms`,
      providesTags: ["room"],
    }),
    singleRoom: build.query<IRoom, string>({
      query: (id) => `/viewRooms/${id}`,
      providesTags: ["room"],
    }),
    createRoom: build.mutation<IRoom, Partial<IRoom>>({
      query(body) {
        return {
          url: `/createRoom`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["room"],
    }),
  }),
});

export const { useGetAllRoomQuery, useSingleRoomQuery, useCreateRoomMutation } =
  roomApi;
