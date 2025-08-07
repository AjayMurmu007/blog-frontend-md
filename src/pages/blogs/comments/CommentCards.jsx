// import React from 'react'
// import commentorIcon from '../../../assets/commentor.png'
// import formatDate from '../../../utils/formatDate'
// import PostAComment from './PostAComment'
// import { useSelector } from 'react-redux'

// const CommentCards = ({ comments }) => {

//     // const user = JSON.parse(localStorage.getItem('user')) || {};
//     // console.log('user', user);
//     const { user } = useSelector((state) => state.auth);
//     // console.log('user from redux', user);
//     return (
//         <div className='my-6 bg-white p-8'>
//             <div>
//                 {
//                     comments && comments?.length > 0 ? <div>
//                         <h3 className='text-lg font-medium'> All Comments </h3>
//                         <div>
//                             {
//                                 comments.map((comment, index) => (
//                                     <div key={index} className='mt-4'>
//                                         <div className='flex items-center gap-4'>
//                                             <img src={commentorIcon} alt='' className='h-14' />
//                                             <div>
//                                                 <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{comment?.user?.username}</p>
//                                                 <p className='text-[12px] italic'>{formatDate(comment.createdAt)}</p>
//                                             </div>
//                                         </div>

//                                         {/* comments details */}
//                                         <div className='text-gray-600 mt-5 border  p-8'>
//                                             <p className='md:w-4/5'>{comment?.comment}</p>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </div>
//                     </div> : <div className='text-gray-500 text-lg font-medium'>No comments yet.</div>

//                 }
//             </div>

//             {/* comment input here */}
//             <PostAComment />
//         </div>
//     )
// }

// export default CommentCards




import React from 'react'
import commentorIcon from '../../../assets/commentor.png'
import formatDate from '../../../utils/formatDate'
import PostAComment from './PostAComment'
import { useSelector } from 'react-redux'

const CommentCards = ({ comments }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className='my-10 bg-white shadow-xl rounded-lg p-6 md:p-10'>
            {/* Heading */}
            <div className='mb-6'>
                <h2 className='text-2xl font-bold text-gray-800 border-b pb-2'>
                    {comments?.length > 0 ? `All Comments (${comments.length})` : "No Comments Yet"}
                </h2>
            </div>

            {/* Comment List */}
            <div className='space-y-6'>
                {
                    comments?.length > 0 && comments.map((comment, index) => (
                        <div
                            key={index}
                            className='flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow transition'
                        >
                            {/* Avatar */}
                            <div>
                                <img
                                    src={commentorIcon}
                                    alt='User'
                                    className='w-12 h-12 rounded-full object-cover border border-gray-300'
                                />
                            </div>

                            {/* Content */}
                            <div className='flex-1'>
                                <div className='flex flex-col md:flex-row md:items-center justify-between mb-1'>
                                    <p className='text-lg font-semibold text-blue-600 capitalize'>{comment?.user?.username}</p>
                                    <span className='text-sm text-gray-500 italic'>{formatDate(comment.createdAt)}</span>
                                </div>

                                <div className='text-gray-700 text-base leading-relaxed bg-white rounded-md p-4 border border-gray-100 shadow-sm'>
                                    {comment?.comment}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Divider */}
            <hr className='my-8 border-gray-300' />

            {/* Comment Input Section */}
            <div>
                <PostAComment />
            </div>
        </div>
    )
}

export default CommentCards
