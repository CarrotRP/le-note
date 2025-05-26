import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useEffect } from 'react';
import { useNavigate, Outlet } from "react-router-dom"; //Outlet is like the "<%- incldue('partial') %>" in node
import { CurrentNoteContextProvider } from "../context/CurrentNoteContext";

//layout with navbar (homepage)
function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/api/notes/check-auth')
        .then(res => res.json())
        .then(data => {
            if(!data.authentication){
                navigate('/login');
            }
        })
    });

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