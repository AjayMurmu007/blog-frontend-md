import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { setUser } from '../../redux/features/auth/authSlice'; //  Correct path
import { Bounce, toast } from 'react-toastify';


const Login = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation(); // Assuming you have a login mutation defined in your authApi



    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        // console.log(data);

        try {
            const response = await loginUser(data).unwrap();
            // console.log('Login successful:', response);
            const { token, user } = response;
            dispatch(setUser({ user })); //  This saves to Redux + localStorage
            // alert("Login successful..");
            toast.success('Login successful..!', {
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
            navigate("/")

        } catch (error) {
            setMessage("Please provide a valid email and password..!")
            
        }
    }

    return (
        <div className='max-w-sm bg-white mx-auto p-8 mt-32'>
            <h2 className='text-2xl font-semibold pt-5'>Login</h2>

            {/*  Form for user login */}
            <form className='space-y-5 max-w-sm mx-auto pt-8' onSubmit={handleLogin}>
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
                <button
                    disabled={loginLoading}
                    type="submit"
                    className='w-full bg-blue-500 hover:bg-blue-900 text-white p-2 mt-4 rounded'>{loginLoading ? 'Logging in...' : 'Login'}</button>
            </form>

            {/* Link to register page */}
            <div className='text-center mt-4'>
                <p className='text-center text-gray-500 mt-4'>Don't have an account? <Link to="/register" className='text-blue-500  hover:underline hover:inset-2'>Register </Link> here. </p>
            </div>
        </div>
    )
}

export default Login
