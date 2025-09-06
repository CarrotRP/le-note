import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function AuthLayout() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        }).then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    navigate(data.redirect);
                }
                setAuth(data.authenticated);
            }).catch(() => setAuth(false));
    }, []);

    if(auth === null) {return null};

    return (
        auth ? <Navigate to='/' /> :
            <Outlet />
    );
}

export default AuthLayout;