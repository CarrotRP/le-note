import { useState, createContext } from "react";

export const CurrentNoteContext = createContext();

export const CurrentNoteContextProvider = ({ children }) => {
    const [currentNote, setCurrentNote] = useState(null);

    return (
        <CurrentNoteContext.Provider value={{ currentNote, setCurrentNote }}>
            {children}
        </CurrentNoteContext.Provider>
    );
}