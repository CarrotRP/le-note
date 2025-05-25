import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom"; //this is like the "<%- incldue('partial') %>" in node
import { CurrentNoteContextProvider } from "../context/CurrentNoteContext";

//layout with navbar (homepage)
function MainLayout() {

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