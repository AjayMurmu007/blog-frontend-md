import React, { useState } from 'react'
import { useDeleteBlogMutation, useFetchBlogsQuery } from '../../../redux/features/blogs/blogsApi';
import formatDate from '../../../utils/formatDate';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md'
import ConfirmModal from '../user/ConfirmModal';
import { Bounce, toast } from 'react-toastify';


const ManagePosts = () => {

  const [query, setQuery] = useState({ search: '', category: '' });
  const { data: blogs = [], isLoading, error, refetch } = useFetchBlogsQuery(query);
  const [deleteBlog] = useDeleteBlogMutation();

  const [showConfirm, setShowConfirm] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);


  // const handleDelete = async (id) => {
  //   console.log(id)

  //   const confirmed = window.confirm("Are you sure you want to delete this post?");
  //   if (!confirmed) return;

  //   try {
  //     const response = await deleteBlog(id).unwrap();
  //     alert(response.message || "Blog deleted successfully");
  //     refetch();
  //   } catch (error) {
  //     console.error("Failed to delete blog".error);
  //     alert("Something went wrong while deleting.");
  //   }
  // }                                                                                                                                                                                                   

  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(postIdToDelete).unwrap();
      // alert("Post deleted successfully");
      toast.success('Post deleted successfully..!', {
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
      refetch();
    } catch (error) {
      alert("Something went wrong");
    }
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };


  return (
    <>
      {
        isLoading && <div>Loading....!!</div>
      }

      <section className="py-1 bg-blueGray-50">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto ">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0 bg-gray-400">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">All Blogs</h3>
                </div>

              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No.
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Blog name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Publishing Date
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Edit or manage
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    blogs && blogs.map((blog, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {blog.title}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatDate(blog.createdAt)}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Link to={`/dashboard/update-items/${blog?._id}`} className='hover:text-blue-700'>
                            <span className='flex gap-1 items-center justify-center'>
                              <MdModeEdit /> Edit
                            </span>
                          </Link>
                        </td>
                        {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => handleDelete(blog._id)} className='bg-red-600 text-white py-1 px-2'>Delete</button>
                        </td> */}
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button onClick={() => {
                            setPostIdToDelete(blog._id);
                            setShowConfirm(true)
                          }} className='bg-red-600 text-white py-1 px-2'>Delete</button>
                        </td>
                      </tr>
                    ))
                  }


                </tbody>
              </table>
            </div>
          </div>
        </div>



        <ConfirmModal
          isOpen={showConfirm}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          message="Are you sure you want to delete this post?"
        />


      </section>


    </>
  )
}

export default ManagePosts
