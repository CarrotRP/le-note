import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom"; //Outlet is like the "<%- incldue('partial') %>" in node
import { CurrentNoteContextProvider } from "../context/CurrentNoteContext";
import { UserContext } from "../context/UserContext";

//layout with navbar (homepage)
function MainLayout() {
    const navigate = useNavigate();
    const {dispatch} = useContext(UserContext);

    
    useEffect(() => {
        fetch('http://localhost:3000/user/check-auth', {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(!data.authenticated){
                navigate(data.redirect);
            }
            console.log(data);
            dispatch({type: 'SET_USER', payload: data.user})
        })
    }, []);

    return (
        <main className="main-layout">
            <CurrentNoteContextProvider>
                <Navbar />
                <Outlet />
                <Footer />
            </CurrentNoteContextProvider>
        </main>
    );
}

export default MainLayout;