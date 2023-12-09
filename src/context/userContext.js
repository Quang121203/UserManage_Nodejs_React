import { useState, createContext, useEffect } from "react";
import { getUser } from "../services/userService";
const UserContext = createContext();
const UserProvider = ({ children }) => {
    const dataDefaults = {
        email: '',
        token: '',
        auth: false,
        isLoading: true
    }
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState(dataDefaults);

    // Login updates the user data with a name parameter
    const login = (data) => {
        setUser({
            email: data.email,
            token: data.token,
            auth: true,
            isLoading: false
        });
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser({ ...dataDefaults, isLoading: false });
    };

    const fetchUser = async () => {
        const result = await getUser();
        if (result && result.data && result.data.EC === 0) {
            const data = {
                email: result.data.DT.user.email,
                token: result.data.DT.token.jwt,
                auth: true,
                isLoading: false
            }
            setUser(data);
        }else{
            logout();
        }
    };

    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
            fetchUser()
        }
        else {
            logout();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider } 