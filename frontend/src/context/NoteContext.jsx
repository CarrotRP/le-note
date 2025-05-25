import { createContext, useReducer } from "react";

export const NoteContext = createContext();

export const noteReducer = (state, action) => {
    switch(action.type){
        case 'SET_NOTE':
            return {notes: action.payload };
        case 'ADD_NOTE':
            return {notes: [...state.notes, action.payload]};
        case 'REMOVE_NOTE':
            return {notes: state.notes.filter(n => n._id != action.payload._id)};
        case 'UPDATE_NOTE':
            return {notes: state.notes.map(n => {
                if(n._id == action.payload._id){
                    console.log(n)
                    console.log(action.payload)
                }})};
        default:
            return state;
    }
}

export const NoteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(noteReducer, { notes: null });

    return (
        <NoteContext.Provider value={{...state, dispatch}}>
            { children }
        </NoteContext.Provider>
    )
}