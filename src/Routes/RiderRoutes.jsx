import React, { use } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';
import Loading from '../Components/Loading';


const RiderRoutes = ({children}) => {
    const {loading,user}=use(AuthContext);
    const {role,roleLoading} =useRole();

    if(loading || !user|| roleLoading)return <Loading/>;
    if(role!=='rider')return <Forbidden/>;

    return  children;

};

export default RiderRoutes;