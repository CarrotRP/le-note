import { createContext } from "react";
import { useState, useReducer } from "react";

export const UserContext = createContext();

//use state would be easier, but trying out usereducer
export const userReducer = (state, action) => {
    switch(action.type){
        case 'SET_USER':
            return {user: action.payload};
        case 'LOGOUT_USER':
            return {user: null};
    }
}

export const UserContextProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(userReducer, {user: null});
    
    return(
        //sending state this time, instead of spreading it(trying out stuff)
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}