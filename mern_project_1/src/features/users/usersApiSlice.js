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
        // The getUsers endpoint is a query that returns the users
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !!result.isError
            },
            //keepUnusedDataFor: 5 is the number of seconds that the data will be kept in the cache
            keepUnusedDataFor: 5,
            //transformResponse is a function that returns the usersAdapter with the initialState and the loadedUsers
            transformResponse: responseData => {
                const loadedUsers = responseData.users.map(user => {
                    user.id = user._id
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers);
            },
            //providesTags is a function that returns the result ids if the result is not undefined
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
// this
export const {
    useGetUsersQuery,
} = usersApiSlice;

// selectUsersResult is a selector that returns the usersApiSlice endpoints getUsers select
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// memoized selector
// selectUsersData is a selector that returns the usersApiSlice endpoints getUsers select data
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // usersResult.data is the data returned from the server
)

// getSelectors creates selectors for the usersAdapter, the selectors are: selectAll, selectById and selectIds
// We are just adding in User to the selectors "selectAllUsers", "selectUserById", "selectUserIds"
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);