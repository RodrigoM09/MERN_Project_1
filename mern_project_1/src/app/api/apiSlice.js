import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Create the apiSlice with the baseQuery and the tagTypes
// baseQuery is the fetchBaseQuery function with the baseUrl
// tagTypes are the types of data that will be fetched from the server
// endpoints are the functions that will be used to fetch the data
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})