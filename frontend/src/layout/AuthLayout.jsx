import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

function AuthLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        }).then(res => res.json())
        .then(data => {
            if(data.authenticated){
                navigate(data.redirect);
            }
        });
    }, []);

    return (
        <Outlet />
    );
}

export default AuthLayout;