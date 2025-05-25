import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import './Display.css';
import { useState, useEffect, useContext } from 'react';
import { NoteContext } from '../context/NoteContext';
import { CurrentNoteContext } from '../context/CurrentNoteContext';

function Display(){
    const { notes, dispatch } = useContext(NoteContext);
    const { currentNote, setCurrentNote } = useContext(CurrentNoteContext);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await fetch('http://localhost:3000/api/notes');
            const data = await response.json();
            
            if(response.ok){
                dispatch({type: 'SET_NOTE', payload: data});
            }
        }

        fetchNotes();
    }, []);

    const handleClick = (id) => {
        fetch(`http://localhost:3000/api/notes/${id}`)
        .then(response => response.json())
        .then(data => setCurrentNote(data));
    }

    return(
        <main className='home'>
            <LeftPanel notes={notes} dispatch={dispatch} handleClick={handleClick}/>
            <RightPanel currentNote={currentNote}/>
        </main>
    );
}

export default Display;