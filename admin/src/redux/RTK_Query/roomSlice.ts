import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { serverURL } from "../URL";
export interface IRoom {
  _id: string;
  roomNumber: string;
  description: string;
  photos?: Array<string>;
  perks?: Array<string>;
  roomType: string;
  price: number;
  maxGuest: number;
}
export interface Ivacant {
  date: Date;
  vacantRooms: [
    {
      _id: string;
      roomNumber: string;
      price: number;
    },
  ];
  bookedRooms: [
    {
      _id: string;
      roomNumber: string;
      price: number;
    },
  ];
}
type roomResponse = IRoom[];
// type vacantResponse = Ivacant[];
// register slice
export const roomApi = createApi({
  reducerPath: "roomAPi",
  baseQuery: fetchBaseQuery({ baseUrl: `${serverURL}/v1/rooms` }),
  tagTypes: ["room"],
  endpoints: (build) => ({
    getAllRoom: build.query<roomResponse, void>({
      query: () => `/viewRooms?search`,
      providesTags: ["room"],
    }),
    getVacantRoom: build.query<Ivacant, void>({
      query: () => `/viewRooms/available`,
      providesTags: ["room"],
    }),
    singleRoom: build.query<IRoom, string | null>({
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

export const {
  useGetAllRoomQuery,
  useGetVacantRoomQuery,
  useSingleRoomQuery,
  useCreateRoomMutation,
} = roomApi;
