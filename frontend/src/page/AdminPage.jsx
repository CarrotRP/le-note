import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function AdminPage() {
    const {state} = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:3000/user/admin', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => console.log(data));
    }, []);

    return (
        state.user?.role == 'user' ? <Navigate to='/'/> :
        <main className="admin-page">
            <h1>this is admin page!</h1>
        </main>
    );
}