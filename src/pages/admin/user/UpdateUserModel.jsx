import React, { useState } from 'react'
import { useUpdateUserMutation } from '../../../redux/features/auth/authApi';

const UpdateUserModel = ({ user, onClose, onRoleUpdate }) => {

    const [role, setRole] = useState(user?.role);

    const [updateUserRole] = useUpdateUserMutation();

    const handleUpdateRole = async () => {

        const confirmed = window.confirm("Are you sure you want to update the user role?");
        if (!confirmed) return;

        try {
            await updateUserRole({ userId: user?._id, role }).unwrap();
            alert("Role update succerssfully..!");
            onRoleUpdate();
            onClose();
        } catch (error) {
            // console.log("Failed to update user role", error);
            alert("Failed to update user role", error)
        }
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 '>
            <div className='bg-white p-4 rounded shadow-lg w-1/3'>
                <h2 className='text-xl mb-4 text-center'>Edit User</h2>

                <div>
                    <label className='blovk text-sm font-medium text-gray-700'> Email </label>
                    <input type='text' value={user?.email} readOnly className='mt-1 w-full bg-bgPrimary block shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-5 focus:outline-none' />
                </div>

                <div>
                    <label className='blovk text-sm font-medium text-gray-700'> Role </label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className='mt-1 w-full bg-bgPrimary block shadow-sm sm:text-sm border-gray-300 rounded-md py-3 px-5 focus:outline-none'>
                        <option value={"user"}>User</option>
                        <option value={"admin"}>Admin</option>
                    </select>
                </div>

                <div className='flex justify-end pt-5'>
                    <button onClick={onClose} className='bg-gray-500 text-white px-4 rounded-2xl py-2 mr-2'>Cancel</button>
                    <button onClick={handleUpdateRole} className='bg-blue-500 text-white px-4 rounded-2xl py-2 mr-2'> Save</button>
                </div>

            </div>
        </div>
    )
}

export default UpdateUserModel
