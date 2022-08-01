import React from 'react';
import AuthContext from "./context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = (props) => {
    let {AuthToken} = AuthContext(AuthToken)
    return (
        AuthToken ? <Outlet/> : <Navigate to='/login' />
    );
}

export default PrivateRoutes;