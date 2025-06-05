import { useEffect, useRef, useContext } from 'react';
import './Navbar.css'
import { CurrentNoteContext } from '../context/CurrentNoteContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function Navbar() {
    const { state, dispatch } = useContext(UserContext);

    const { setCurrentNote } = useContext(CurrentNoteContext);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleProfileClick = (e) => {
        e.stopPropagation(); //stop the click event from going up to the parents(stop the event listening here)
        dropdownRef.current.classList.toggle('active');
    }
    
    useEffect(() => {
        //close dropdown when click outside
        const clickOutside = e => {
        if(dropdownRef.current && dropdownRef.current.classList.contains('active') && !dropdownRef.current.contains(e.target)){
            dropdownRef.current.classList.remove('active');
        }}

        document.addEventListener('click', clickOutside);
    }, []);

    const handleLogout = () => {
        fetch('http://localhost:3000/user/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => { 
                navigate(data.redirect);
                dispatch({type: 'LOGOUT_USER'});
            });
    }

    return (
        <nav>
            <h1>Le-Note</h1>
            <div className="right-side">
                <svg onClick={() => { setCurrentNote(n => n = "NEW") }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
                <svg onClick={handleProfileClick} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                </svg>
                <div className="dropdown" ref={dropdownRef}>
                    <li>{state.user?.username}</li>
                    <li onClick={handleLogout}>Logout</li>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;