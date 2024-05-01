import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IRegister {
  fullname: string;
  email: string;
  password: string;
}
export interface ILogin {
  fullname: string;
  email: string;
  password: string;
}
// register slice
export const authApi = createApi({
  reducerPath: "authAPi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["auth"],
  endpoints: (build) => ({
    // Register Endpoints
    register: build.mutation<IRegister, Partial<IRegister>>({
      query(body) {
        return {
          url: `/admin/register`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    // Register Endpoints

    login: build.mutation<ILogin, Partial<ILogin>>({
      query(body) {
        return {
          url: `/admin/login`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
