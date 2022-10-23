import React, {useReducer} from "react";
import {getAll} from "../Api/BooksAPI";

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "all_reads":
            return {...state, all_books: action.payload};

        case "set_shelf":
            return {...state, all_books: state.all_books.filter((book) => {
                return book.id === action.payload.id;
            }).map((book) => {
                return book.shelf = action.payload.shelf;
            })}

        case "currently_reading":
            return {...state, currently_reading: state.all_books.filter((book) => {
                return book.shelf === "currentlyReading";
            })};

        case "want_to_read":
            return {...state, want_to_read: state.all_books.filter((book) => {
                return book.shelf === "wantToRead";
            })};

        case "read":
            return {...state, read: state.all_books.filter((book) => {
                return book.shelf === "read";
            })}

        default: 
            return state;
    }
}

export const ContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        all_books: [],
        currently_reading: [],
        want_to_read: [],
        read: [],
    });

    const allReads = async() => {
        try {
            const all_books = await getAll();            
            console.log(all_books);
            dispatch({type: "all_reads", payload: all_books});
        } catch(e) {
            console.log(e)
        }
    }

    const currentlyReading = (id, {shelf}) => {
        dispatch({type: "set_shelf", payload: {id, shelf}})
        if (state.currently_reading) {
            dispatch({type: "currently_reading"})
        }
    }

    const wantToRead = (id, {shelf}) => {
        console.log(id);
        console.log(shelf);
        dispatch({type: "set_shelf", payload: {id, shelf}})
        if (state.want_to_read) {
            dispatch({type: "want_to_read"});
        }
    }

    const read = (id, {shelf}) => {
        dispatch({type: "set_shelf", payload: {id, shelf}});
        if (state.currently_reading) {
            dispatch({type: "read"})
        }
    }


    return <Context.Provider value={{state, allReads, currentlyReading, wantToRead, read}}>
        {children}
    </Context.Provider>
    
};

export default Context

