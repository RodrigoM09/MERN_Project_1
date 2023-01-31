import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import {response} from "express";

const notesAdapter = createEntityAdapter();

const initialState = notesAdapter.getInitialState();

// Create the notesApiSlice with the endpoints, the query, the validateStatus,
// the keepUnusedDataFor, the transformResponse and the providesTags.
// The query is the url of the endpoint
// The validateStatus is a function that returns true if the response status is 200 and the result is not an error
// The keepUnusedDataFor is the number of seconds that the data will be kept in the cache
// The transformResponse is a function that returns the notesAdapter with the initialState and the loadedNotes
// The providesTags is a function that returns the result ids if the result is not undefined
export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // The getNotes endpoint is a query that returns the notes
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !!result.isError
            },
            //keepUnusedDataFor: 5 is the number of seconds that the data will be kept in the cache
            keepUnusedDataFor: 5,
            //transformResponse is a function that returns the notesAdapter with the initialState and the loadedNotes
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            //providesTags is a function that returns the result ids if the result is not undefined
            providesTags: (result, error, arg) => {
                if (result?.ids){
                    return [
                        { type: 'note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'note', id }))
                    ]
                }else return [{type: 'note', id: 'LIST'}]
            }
        }),
    }),
})
// this
export const {
    useGetNotesQuery,
} = notesApiSlice;

// selectNotesResult is a selector that returns the notesApiSlice endpoints getNotes select
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// memoized selector
// selectNotesData is a selector that returns the notesApiSlice endpoints getNotes select data
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // notesResult.data is the data returned from the server
)

// getSelectors creates selectors for the notesAdapter, the selectors are: selectAll, selectById and selectIds
// We are just adding in note to the selectors "selectAllNotes", "selectNoteById", "selectNoteIds"
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIdsN
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);