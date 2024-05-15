import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserContext';

const PrivateRoutes = (props) => {
    const { user } = useContext(UserContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (!(user && user.isAuthenticated)) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (user && user.isAuthenticated === true) {
        return (
            <>
                      {props.children}
            </>
        );
    } else {
        return null;
    }
};

export default PrivateRoutes;