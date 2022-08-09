import React, {useContext} from 'react';
import AuthContext from "./context/AuthContext";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoutes = (props) => {
    let {authTokens} = useContext(AuthContext)
    console.log(authTokens, "Protected route token")
    return (
        authTokens ? <Outlet/> : <Navigate to='/login' />
    );
}

export default PrivateRoutes;