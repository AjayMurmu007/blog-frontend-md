// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
// import { FiUsers } from "react-icons/fi"
// import { FaBlog } from "react-icons/fa"
// import { RiAdminLine } from "react-icons/ri"
// import { useFetchBlogsQuery } from '../../../redux/features/blogs/blogsApi'
// import { useGetCommentsQuery } from '../../../redux/features/comments/commentApi'
// import { useGetUserQuery } from '../../../redux/features/auth/authApi'
// import BlogsChat from './BlogsChat'

// const Dashboard = () => {

//   const [query, setQuery] = useState({ search: '', category: '' });
//   const { user } = useSelector((state) => state.auth)

//   const { data: blogs = [], isLoading: blogsLoading } = useFetchBlogsQuery(query);
//   // console.log(blogs);
//   // const { data: comments = {} } = useGetCommentsQuery(query);
//   // const { data: users = {} } = useGetUserQuery();
//   // const adminCounts = users.users?.filter(user => user.role === 'admin').length
//   // console.log(adminCounts);
//    const { data: commentsData , isLoading: commentsLoading } = useGetCommentsQuery(query);
//   const { data: usersData, isLoading: usersLoading } = useGetUserQuery();

//   const totalUsers = usersData?.users?.length || 0;
//   const adminCounts = usersData?.users?.filter(u => u.role === 'admin')?.length || 0;
//   const totalComments = commentsData?.totalComments || 0;

//   const isLoading = blogsLoading || commentsLoading || usersLoading;

//   if (isLoading) {
//     return (
//       <div className='w-full h-screen flex justify-center items-center'>
//         <p className='text-xl font-semibold'>Loading... Please wait ⏳</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* {isLoading && (<div>Loading....!!</div>)} */}
//       <div className='space--y-6'>
//         <div className='bg-bgPrimary p-5'>
//           <h1> Hi, {user?.username} ! </h1>
//           <p>Welcome to the admin dashboard!</p>
//           <p>Here you can oversee user activity, manage posts, view analytics, and configure settings. Everything you need to efficiently manage your system is right at your fingertips.</p>
//         </div>

//         {/* cards grid */}
//         <div className='flex flex-col md:flex-row justify-center gap-8 pt-8'>
//           <div className='bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
//             <FiUsers className='size-8 text-indigo-600' />
//             <p>{totalUsers} user{totalUsers !== 1 ? 's' : ''}</p>
//           </div>
//           <div className='bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
//             <FaBlog className='size-8 text-red-600' />
//             <p> {blogs.length} blog{blogs.length !== 1 ? 's' : ''} </p>
//           </div>
//           <div className='bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
//             <RiAdminLine className='size-8 text-lime-600' />
//             <p>{adminCounts} admin{adminCounts !== 1 ? 's' : ''}</p>
//           </div>
//           <div className='bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center'>
//             <FiUsers className='size-8 text-indigo-600' />
//             {/* <p> {comments?.totalComments} comments</p> */}
//             <p> {totalComments} comment{totalComments !== 1 ? 's' : ''}</p>
//           </div>
//         </div>

//         {/* graphs and chats */}
//         <div className='pt-5 pb-5'>
//           <BlogsChat blogs={blogs} />
//         </div>

//       </div>
//     </>
//   )
// }

// export default Dashboard



import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FiUsers } from "react-icons/fi"
import { FaBlog } from "react-icons/fa"
import { RiAdminLine } from "react-icons/ri"
import { useFetchBlogsQuery } from '../../../redux/features/blogs/blogsApi'
import { useGetCommentsQuery } from '../../../redux/features/comments/commentApi'
import { useGetUserQuery } from '../../../redux/features/auth/authApi'
import BlogsChat from './BlogsChat'

const Dashboard = () => {

  const [query, setQuery] = useState({ search: '', category: '' });
  const { user } = useSelector((state) => state.auth)

  const { data: blogs = [], isLoading: blogsLoading } = useFetchBlogsQuery(query);
  const { data: commentsData, isLoading: commentsLoading } = useGetCommentsQuery(query);
  const { data: usersData, isLoading: usersLoading } = useGetUserQuery();

  const totalUsers = usersData?.users?.length || 0;
  const adminCounts = usersData?.users?.filter(u => u.role === 'admin')?.length || 0;
  const totalComments = commentsData?.totalComments || 0;

  const isLoading = blogsLoading || commentsLoading || usersLoading;

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <p className='text-xl font-semibold'>Loading... Please wait ⏳</p>
      </div>
    );
  }

  return (
    <div className='px-4 md:px-10 py-6 space-y-6'>
      {/* Welcome message */}
      <div className='bg-bgPrimary p-5 rounded shadow'>
        <h1 className='text-xl md:text-2xl font-semibold mb-1'>Hi, {user?.username}!</h1>
        <p className='text-sm md:text-base'>Welcome to the admin dashboard!</p>
        <p className='text-sm text-gray-600 mt-1'>
          Here you can oversee user activity, manage posts, view analytics, and configure settings.
        </p>
      </div>

      {/* Stats cards grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        <div className='bg-indigo-100 p-5 rounded-sm flex flex-col items-center'>
          <FiUsers className='text-3xl text-indigo-600 mb-1' />
          <p className='text-sm font-medium'>{totalUsers} user{totalUsers !== 1 ? 's' : ''}</p>
        </div>
        <div className='bg-red-100 p-5 rounded-sm flex flex-col items-center'>
          <FaBlog className='text-3xl text-red-600 mb-1' />
          <p className='text-sm font-medium'>{blogs.length} blog{blogs.length !== 1 ? 's' : ''}</p>
        </div>
        <div className='bg-lime-100 p-5 rounded-sm flex flex-col items-center'>
          <RiAdminLine className='text-3xl text-lime-600 mb-1' />
          <p className='text-sm font-medium'>{adminCounts} admin{adminCounts !== 1 ? 's' : ''}</p>
        </div>
        <div className='bg-indigo-100 p-5 rounded-sm flex flex-col items-center'>
          <FiUsers className='text-3xl text-indigo-600 mb-1' />
          <p className='text-sm font-medium'>{totalComments} comment{totalComments !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Graph or Chart */}
      <div className='mt-6'>
        <BlogsChat blogs={blogs} />
      </div>
    </div>
  )
}

export default Dashboard
