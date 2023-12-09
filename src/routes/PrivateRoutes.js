import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children }) => {
    const { user } = useContext(UserContext);
    
    return (
        <>
            {user.auth ? children : (<Navigate to="/login" />)}
        </>

    );
}
export default PrivateRoutes;