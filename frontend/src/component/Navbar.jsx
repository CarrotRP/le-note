import { useContext } from 'react';
import './Navbar.css'
import { CurrentNoteContext } from '../context/CurrentNoteContext';

function Navbar() {
    const { setCurrentNote } = useContext(CurrentNoteContext); 

    return (
        <nav>
            <h1>Le-Note</h1>
            <div className="right-side">
            <svg onClick={() => {setCurrentNote(n => n = "NEW")}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
            </svg>
            <img src="#" alt="profile-img" />
            </div>
        </nav>
    );
}

export default Navbar;