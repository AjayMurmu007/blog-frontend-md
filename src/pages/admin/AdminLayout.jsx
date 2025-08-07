// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import AdminNavigation from './AdminNavigation'
// import { useSelector } from 'react-redux'

// const AdminLayout = () => {

//   const { user } = useSelector((state) => state.auth)

//   if (!user || user.role !== 'admin') {
//     return <Navigate to={"/login"} />
//   }

//   return (
//     <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start'>
//       <header className='lg:w-1/5 sm:w-2/5 w-full'>
//         <AdminNavigation />
//       </header>
//       <main className='p-8 bg-white  w-full'>
//         <Outlet />
//       </main>
//     </div>
//   )
// }

// export default AdminLayout




import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminNavigation from './AdminNavigation';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== 'admin') {
    alert("You must be an Admin to access this page..!!");
    return <Navigate to="/" />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:relative md:translate-x-0 md:flex-shrink-0`}
      >
        <div className="h-full overflow-y-auto p-4">
          <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>
          <AdminNavigation />
        </div>
      </div>

      {/* Overlay on mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
