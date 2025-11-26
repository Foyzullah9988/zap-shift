import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
// import Spinner from '../Components/Spinner';
import { AuthContext } from '../Context/AuthProvider';
import Loading from '../Components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading} = use(AuthContext)

    const location = useLocation();
    // console.log(location);
    

    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>
            {/* <Spinner /> */}
            <Loading/>
        </div>
    }

    if (user && user?.email) {
        return children;
    }

    return <Navigate state={{from:location}} to={'/auth/login'} replace/>
};


export default PrivateRoute;