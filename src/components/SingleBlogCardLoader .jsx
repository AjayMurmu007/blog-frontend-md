import React from 'react'

const SingleBlogCardLoader = () => {
    return (
        <div className='bg-white p-8 shadow-md rounded-lg animate-pulse space-y-6'>
            <div className='h-8 bg-gray-300 rounded w-2/3'></div>
            <div className='h-4 bg-gray-200 rounded w-1/3'></div>
            <div className='h-[300px] bg-gray-300 rounded'></div>
            <div className='space-y-2'>
                <div className='h-4 bg-gray-200 rounded w-full'></div>
                <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                <div className='h-4 bg-gray-200 rounded w-2/3'></div>
            </div>
        </div>
    )
}

export default SingleBlogCardLoader 
