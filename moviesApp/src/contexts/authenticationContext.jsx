import React, {useState, useLocation, useNavigate} from "react";

export const AuthenticationContext = React.createContext(null);

const AuthenticationContextProvider = (props) => {
    const [session, setSession] = useState(null);
    // const location = useLocation();
    // const navigate = useNavigate();

    const login = (session) => {
        console.log("login session", session)
        setSession(session);
        setAuthenticated(true);
        
    };

    const retrieveSession = () => {
        return session;
    };
    
    const logout = () => {
        setAuthenticated(false);
        setSession(null);
    };
    
    return (
        <AuthenticationContext.Provider
        value={{
            login,
            logout,
            retrieveSession,
        }}
        >
        {props.children}
        </AuthenticationContext.Provider>
    );
    }

export default AuthenticationContextProvider;