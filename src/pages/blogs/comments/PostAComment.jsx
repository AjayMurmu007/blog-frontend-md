import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { usePostCommentMutation } from '../../../redux/features/comments/commentApi';
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi';
import { Bounce, toast } from 'react-toastify';


const PostAComment = () => {

    const { id } = useParams();
    const [comment, setComment] = useState('');

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    // console.log('user', user);

    const [postComment, { isLoading, isError, isSuccess }] = usePostCommentMutation();
    const { refetch } = useFetchBlogByIdQuery(id, { skip: !id });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            // alert('You must be logged in to post a comment');
            toast.error('You must be logged in to post a comment..!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            navigate('/login');
            return;
        }

        const newComment = {
            comment: comment,
            user: user._id,
            postId: id
        }
        // console.log('newComment', newComment);

        try {
            const response = await postComment(newComment).unwrap();
            // console.log('Comment posted successfully:', response);
            // alert('Comment posted successfully');
            toast.success('Comment posted successfully..!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setComment('');
            refetch(); // Refetch the blog to update comments

        } catch (error) {
            // console.error('Error posting comment:', error);
            alert('Failed to post comment. Please try again later.');
        }
    };


    // if (isLoading) {
    //     return <div className='text-center text-lg font-medium'>Posting your comment...</div>
    // }

    { isError && <div className='text-red-500'>Failed to post comment</div> }
    { isSuccess && <div className='text-green-500'>Comment posted successfully</div> }

    return (
        <div className='mt-8'>
            <h3 className='text-lg font-medium mb-8'>Leave a comment</h3>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <textarea
                    name='text'
                    id=''
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    cols={30}
                    rows={10}
                    placeholder='Share your opnion..!'
                    className='w-full bg-bgPrimary focus:outline-none p-5'>
                </textarea>
                {/* <button className='w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md' type='submit'>Submit</button> */}
                <button className='w-full bg-primary hover:bg-indigo-500 text-white font-medium py-3 rounded-md' type='submit'>
                    {isLoading ? 'Posting your comment...' : 'Submit'}
                </button>

            </form>
        </div>
    )
}

export default PostAComment
