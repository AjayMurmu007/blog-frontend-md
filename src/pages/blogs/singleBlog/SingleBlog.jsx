import React from 'react'
import { useFetchBlogByIdQuery } from '../../../redux/features/blogs/blogsApi';
import { useParams } from 'react-router-dom';
import SingleBlogCard from './SingleBlogCard';
import CommentCards from '../comments/CommentCards';
import CommentLoader from '../../../components/CommentLoader';
import SingleBlogCardLoader from '../../../components/SingleBlogCardLoader ';
import RelatedBlogs from '../comments/RelatedBlogs';

const SingleBlog = () => {

    const { id } = useParams();
    // console.log('id:', id);

    const { data: blog, isLoading, isError } = useFetchBlogByIdQuery(id);
    // console.log('blog:', blog);

    // if (isLoading) return <div>Loading...</div>;
    if (isLoading) {
        return (
            <div className='container mx-auto mt-8'>
                <SingleBlogCardLoader />
                <CommentLoader /> 
            </div>
        );
    }
    if (isError) return <div>Error fetching blog</div>;

    return (
        <div className='text-primary container mx-auto mt-8'>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error fetching blog</div>}
            {
                blog?.post && (
                    <div className='flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8'>
                        <div className='lg:w-2/3 w-full'>
                            <SingleBlogCard blog={blog.post} />
                            <CommentCards comments={blog?.comments} />
                        </div>
                        <div className='bg-white lg:w-1/3 w-full'>
                            <RelatedBlogs />
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default SingleBlog
