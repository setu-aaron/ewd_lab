import React, {useEffect, useState} from "react"
import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import { supabase } from "../../supabaseClient";
import Account from "../../pages/accountPage";
const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [sess, setSess] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (sess === null) {
            console.log("Session is null, retrieve session")
            retrieveSession();
        } 
      }, [sess]);

    async function retrieveSession() {
        console.log("retrieving session")
        const {data: { session },} = await supabase.auth.getSession()
         setSess(session);
        setLoading(false);
    }
    
    if (loading) {
        return <div>Loading...</div>
    } else {
        if (sess){
            console.log("Returning Children", children)
            return children;
        } else {
            return (
                <Navigate to={"/login"} replace 
                    state={{intent: location.pathname}}/>
            )
        }
    }

};

export default ProtectedRoute;