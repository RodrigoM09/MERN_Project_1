import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import {response} from "express";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

// Create the usersApiSlice with the endpoints, the query, the validateStatus,
// the keepUnusedDataFor, the transformResponse and the providesTags.
// The query is the url of the endpoint
// The validateStatus is a function that returns true if the response status is 200 and the result is not an error
// The keepUnusedDataFor is the number of seconds that the data will be kept in the cache
// The transformResponse is a function that returns the usersAdapter with the initialState and the loadedUsers
// The providesTags is a function that returns the result ids if the result is not undefined

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !!result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.users.map(user => {
                    user.id = user._id
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids){
                       return [
                           { type: 'User', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'User', id }))
                           ]
                }else return [{type: 'User', id: 'LIST'}]
            }
        }),
    }),
})