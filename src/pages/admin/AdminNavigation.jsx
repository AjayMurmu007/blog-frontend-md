import React from 'react'
import AdminImg from '../../assets/admin.png'
import { NavLink } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice'
import { toast, Bounce } from 'react-toastify';


const AdminNavigation = () => {

  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());

      toast.success('Logout successful', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

    } catch (error) {
      // console.error("Failed to logout", error);
      toast.error('Logout failed', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  return (
    <div className='space-y-5 bg-white p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between'>
      <div>
        {/* Header part */}
        <div>
          <img src={AdminImg} alt='' className='size-14' />
          <p className='font-semibold'>Admin</p>
        </div>
        <hr />

        <ul className='space-y-5 pt-5'>
          <li>
            <NavLink to={"/"} end className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} >Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard"} end className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} >Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/add-new-post"} className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} > Add New Post
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/manage-items"} className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} > Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/users"} className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-black"} > Users
            </NavLink>
          </li>
        </ul>
      </div>

      <div className='mb-3'>
        <hr className='mb-3' />
        <button onClick={handleLogout} className='text-white bg-red-500 font-medium px-5 py-1 rounded-sm'>Logout</button>
      </div>


    </div>
  )
}

export default AdminNavigation
