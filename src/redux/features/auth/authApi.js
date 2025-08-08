import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:5000/api/auth',
        baseUrl: 'https://blog-backend-md.vercel.app/api/auth',
        credentials: 'include',
    }),
    tagTypes: ['User'], 
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser,
            }),
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),

        getUser: builder.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
            providesTags: ['User'],       // Invalidate user data when it changes

        }),

        updateUser: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/users/${userId}`,
                method: 'PUT',
                body: { role },
            }),
            refetchOnMount: true,          // Refetch user data on component mount
            invalidatesTags: ['User'],     // Invalidate user data when a user is deleted
        }),

        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],     //  To ensure user list is updated
        }),

    }),

});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = authApi;
export default authApi;