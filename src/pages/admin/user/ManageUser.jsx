import React, { useState } from 'react'
import { useDeleteUserMutation, useGetUserQuery } from '../../../redux/features/auth/authApi';
import { MdModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import UpdateUserModel from './UpdateUserModel';
import ConfirmModal from './ConfirmModal';
import { Bounce, toast } from 'react-toastify';



const ManageUser = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const { data, error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const navigate = useNavigate();

  // console.log(typeof data)
  // console.log(data);

  // const handleDelete = async (id) => {
  //   console.log(id)

  //   // const confirmed = window.confirm("Are you sure you want to delete this user?");
  //   // if (!confirmed) return;

  //   try {
  //     const response = await deleteUser({ userId: id }).unwrap();
  //     alert(response.message || "User deleted successfully");
  //     refetch();
  //     navigate("/")
  //   } catch (error) {
  //     console.error("Failed to delete user".error);
  //     alert("Something went wrong while deleting.");
  //   }
  // }

  // confirm model

  const handleDeleteClick = (id) => {
    setUserIdToDelete(id);
    setShowConfirm(true); // open modal
  };

  const handleConfirm = async () => {


    try {
      const response = await deleteUser({ userId: userIdToDelete }).unwrap();
      // alert(response.message || "User deleted successfully");
      toast.success("User deleted successfully..!", {
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
      navigate("/dashboard/users")
    } catch (error) {
      // console.error("Failed to delete user".error);
      alert("Something went wrong while deleting.");
    }

    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  //////


  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModelOpen(true);
  }

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setSelectedUser(null);
  }

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
                  <h3 className="font-semibold text-base text-blueGray-700 ">All Users</h3>
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
                      User Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      User Role
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
                    data?.users && data?.users.map((user, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {user.email}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span className={`rounded-full py-[2px] px-3 ${user?.role === "admin" ? "bg-indigo-500 text-white" : "bg-amber-300"}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button className='hover:text-blue-700'>
                            <button onClick={() => handleEdit(user)} className='flex gap-1 items-center justify-center'>
                              <MdModeEdit /> Edit
                            </button>
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {/* <button onClick={() => handleDelete(user?._id)} className='bg-red-600 text-white py-1 px-2'>Delete</button> */}
                          <button onClick={() => handleDeleteClick(user?._id)} className='bg-red-600 text-white py-1 px-2'>Delete</button>
                        </td>
                      </tr>
                    ))
                  }


                  <ConfirmModal
                    isOpen={showConfirm}
                    onClose={handleCancel}
                    onConfirm={handleConfirm}
                    message="Are you sure you want to delete this user?"
                  />


                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section>

      {/* Model for role */}
      {
        isModelOpen && <UpdateUserModel user={selectedUser} onRoleUpdate={refetch} onClose={handleCloseModel} />
      }

    </>
  )
}

export default ManageUser
