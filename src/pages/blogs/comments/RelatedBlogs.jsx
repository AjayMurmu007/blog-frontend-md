import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useFetchRelatedBlogsQuery } from '../../../redux/features/blogs/blogsApi';

const RelatedBlogs = () => {

    const { id } = useParams();
    const { data: relatedBlogs = [], isLoading, isError } = useFetchRelatedBlogsQuery(id);
    // console.log(relatedBlogs);

    return (
        <div>
            <h3 className='text-2xl font-medium pt-8 px-8 pb-5'>Related Blogs</h3>
            <hr />
            {
                relatedBlogs && relatedBlogs.length > 0 ?
                    (
                        <div className='space-y-4 mt-5'>
                            {
                                relatedBlogs.map((blog) => (
                                    <Link key={blog._id} to={`/blogs/${blog?._id}`} className='flex flex-col sm:flex-row sm:items-center  gap-4 shadow-sm px-8 py-4'>
                                        <div className='size-18'>
                                            <img src={blog.coverImg} alt={blog.title} className='w-full h-full ring-2 ring-blue-700 rounded-full' />
                                        </div>
                                        <div>
                                            <h4 className='font-medium text-[#1E73BE]'>{blog?.title.slice(0, 100)}...</h4>
                                            <p className='text-gray-500 text-sm'>{blog.description.substring(0,50)}....</p>
                                            <p className='text-gray-400 text-xs'>By {blog.author?.email}</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    ) : (
                        <div className='p-8'>No related blogs found..!</div>
                    )
            }
        </div>
    )
}

export default RelatedBlogs
