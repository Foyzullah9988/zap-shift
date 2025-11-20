import React, { use } from 'react';
import Logo from '../Components/Logo';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../Context/AuthProvider';

const Navbar = () => {

    const {user,logout} = use(AuthContext)

    const handleLogout = () => {
        logout()
            .then(() => {

            })
            .catch(error => {
                console.error(error);
            })
        }
    const links = <>
        <li><a>Home</a></li>
        <li><a>Services</a></li>
        <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <Logo>
                    <Link to={'/'} className="btn btn-ghost text-xl"></Link>
                </Logo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end space-x-3">
                {
                    user
                    ?
                    <a onClick={handleLogout} className="btn">Logout</a>
                    :
                    <Link to={'/auth/login'} className="btn">Login</Link>
                }
                <Link to={'/rider'} className="btn btn-primary text-black">Be a Rider</Link>
            </div>
        </div>
    );
};

export default Navbar;