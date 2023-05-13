import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://645ccadb250a246ae30e37c6.mockapi.io' }),
  tagTypes:['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => ({ url: '/contacts' }),
      provideTags:['Contact'],
    }),
    addContacts: builder.mutation({
      query: newContact => ({
        url: `/contacts`,
        method: 'POST',
        body: newContact,
      }),
          invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
    }),
  
    
})

export const { useGetContactsQuery, useAddContactsMutation } = contactsApi;
