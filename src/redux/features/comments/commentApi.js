import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:5000/api/comments',
        baseUrl: 'https://blog-backend-md.vercel.app/api/comments',
        credentials: 'include',
    }),
    tagTypes: ['Comments'],
    endpoints: (builder) => ({
        getComments: builder.query({
            query: () => ({
                url: '/total-comments',
                method: 'GET',
            })

        }),

        postComment: builder.mutation({
            query: (newComment) => ({
                url: '/post-comment',
                method: 'POST',
                body: newComment,
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: 'Comments', id: postId }],
        }),
    }),
});

export const { useGetCommentsQuery, usePostCommentMutation } = commentsApi;
export default commentsApi;