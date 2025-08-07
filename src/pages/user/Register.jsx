import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';
import { Bounce, toast } from 'react-toastify';

const Register = () => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [registerUser, { isLoading }] = useRegisterUserMutation();
    
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        // Handle registration logic here
        // console.log('Username:', username);
        // console.log('Email:', email);
        // console.log('Password:', password);

        if (!username || !email || !password) {
            setMessage('Please fill all the fields');
            return;
        }

        const data = {
            username,
            email,
            password
        }

        try {
            await registerUser(data).unwrap();
            // alert("Register successfully");
            toast.success('Register successfully', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });

            setMessage('')
            navigate("/login")

        } catch (error) {
            //   setMessage("Error:", error?.data?.message);
            const errMsg = error?.data?.message || 'Registration failed';
            setMessage(errMsg);
        }
    }



    return (
        <div className='max-w-sm bg-white mx-auto p-8 mt-24'>
            <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>

            {/*  Form for user registration */}
            <form className='space-y-5 max-w-sm mx-auto pt-8' onSubmit={handleRegister}>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='username'
                    className='w-full border border-gray-300 p-2 rounded'
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className='w-full border border-gray-300 p-2 rounded'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='w-full border border-gray-300 p-2 rounded'
                />

                {/* Display login message */}
                {message && <p className='text-red-500'>{message}</p>}

                {/* Submit button for login */}
                <button type="submit" className='w-full bg-blue-500 hover:bg-blue-900 text-white p-2 mt-4 rounded'>Register</button>
            </form>

            {/* Link to register page */}
            <div className='text-center mt-4'>
                <p className='text-center text-gray-500 mt-4'>Already have an account? <Link to="/login" className='text-blue-500  hover:underline hover:inset-2'>Login </Link> here. </p>
            </div>
        </div>
    )
}

export default Register
