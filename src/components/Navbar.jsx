import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { IoClose, IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice'; // Assuming you have a logout action in your authSlice
import { useNavigate } from 'react-router-dom';
import avatorImg from './../assets/commentor.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { Bounce, toast } from 'react-toastify';


const Navbar = () => {

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About us', path: '/about-us' },
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Contact us', path: '/contact-us' }
    ];

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // GET USER FROM REDUX STORE
    const { user } = useSelector((state) => state.auth);      // Assuming you have an auth slice in your Redux store
    // console.log(" logged in user: ", user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutUser] = useLogoutUserMutation();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            // alert("Logout successfully..!!");
            toast.success('Logout successfully..!!', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            navigate("/")
        } catch (error) {

        }
    };


    return (
        <header className='bg-bgPrimary py-1 border-b border-gray-200'>
            <nav className='container mx-auto flex justify-between items-center px-5'>
                <a href="/" ><img src='/logo.png' alt='' className='size-18' />  </a>
                <ul className='sm:flex hidden items-center gap-8'>
                    {
                        navLinks.map((link, index) => (
                            <li key={index} className='inline-block mr-4'>
                                <NavLink to={`${link.path}`} className={({ isActive }) => (isActive ? 'active' : '')}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))
                    }

                    {/* Conditional rendering based on user authentication */}
                    {/* {user && user.role === 'user' ? (
                        <li className="flex items-center gap-3">
                            <img src={avatorImg} alt="avatar" className="w-8 h-8 rounded-full" />


                            <button
                                onClick={handleLogout} // You should implement this
                                className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                    )}

                    {user && user.role === 'admin' && (<li className="flex items-center gap-3">
                        <img src={avatorImg} alt="avatar" className="w-8 h-8 rounded-full" />
                        <Link to="/dashboard">
                            <button className="bg-[#1E73BE] px-4 py-1.5 text-white">
                                Dashboard
                            </button>
                        </Link>
                    </li>
                    )} */}

                    {user ? (
                        <li className="flex items-center gap-3">
                            <img src={avatorImg} alt="avatar" className="w-8 h-8 rounded-full" />

                            {user.role === 'user' && (
                                <button
                                    onClick={handleLogout}
                                    className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
                                >
                                    Logout
                                </button>
                            )}

                            {user.role === 'admin' && (
                                <Link to="/dashboard">
                                    <button className="bg-[#1E73BE] px-4 py-1.5 text-white">
                                        Dashboard
                                    </button>
                                </Link>
                            )}
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login" className="bg-gray-200 px-5 py-2 rounded-md text-black">Login</NavLink>
                        </li>
                    )}



                    {/* <li><NavLink to="/login">Login</NavLink></li> */}
                </ul>

                {/* TOGGLE MENU BUTTON */}
                <div className='sm:hidden flex items-center'>
                    <button onClick={toggleMenu} className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'>
                        {
                            isMenuOpen ? <IoClose className='size-6' /> : <IoMenuSharp className='size-6' />
                        }
                    </button>
                </div>


            </nav>

            {/* MOBILE MENU */}
            {/* {
                isMenuOpen && (
                    <ul className='fixed top-[0px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
                        {navLinks.map((link, index) => (
                            <li key={index} className='px-4 mt-5'>
                                <NavLink to={`${link.path}`} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => (isActive ? 'active' : '')}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                        <li className='px-4 mt-5'>
                            {user ? (
                                <li className="flex items-center gap-3">
                                    <img src={avatorImg} alt="avatar" className="w-8 h-8 rounded-full" />

                                    {user.role === 'user' && (
                                        <button
                                            onClick={handleLogout}
                                            className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
                                        >
                                            Logout
                                        </button>
                                    )}

                                    {user.role === 'admin' && (
                                        <Link to="/dashboard">
                                            <button onClick={() => setIsMenuOpen(false)} className="bg-[#1E73BE] px-4 py-1.5 text-white">
                                                Dashboard
                                            </button>
                                        </Link>
                                    )}
                                </li>
                            ) : (
                                <li>
                                    <NavLink to="/login" className="bg-gray-200 px-5 py-2 rounded-md text-black">Login</NavLink>
                                </li>
                            )}

                            
                        </li>
                    </ul>
                )
            } */}

            <div
                className={`fixed top-0 left-0 w-full h-full z-50 bg-white flex flex-col px-6 py-4 shadow-md transform transition-transform duration-300 ease-in-out sm:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* CLOSE BUTTON */}
                <div className="flex justify-end">
                    <button onClick={() => setIsMenuOpen(false)} className="text-gray-700 text-3xl">
                        <IoClose />
                    </button>
                </div>

                {/* NAVIGATION LINKS */}
                <ul className="flex flex-col space-y-4 mt-6">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `block text-lg ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}

                    {/* AUTH LOGIC */}
                    {user ? (
                        <li className="flex items-center gap-3 mt-4">
                            {/* <img src={avatorImg} alt="avatar" className="w-8 h-8 rounded-full" /> */}
                            {user.role === 'user' ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMenuOpen(false);
                                    }}
                                    className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/dashboard">
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="bg-[#1E73BE] px-4 py-1.5 text-white"
                                    >
                                        Dashboard
                                    </button>
                                </Link>
                            )}
                        </li>
                    ) : (
                        <li>
                            <NavLink
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="bg-gray-200 px-5 py-2 rounded-md text-black inline-block"
                            >
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>



        </header>
    )
}

export default Navbar
