import React, {useReducer} from "react";
import {getAll, update, search} from "../Api/BooksAPI";

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "all_reads":
            return {...state, all_books: action.payload};

        case "set_shelf":
            const updatedBooksShelf = state.all_books.map((book) => {
                if (book.id === action.payload.id) {
                    book.shelf = action.payload.shelf;
                }
                return book;
            });
                update({ id: action.payload.id }, action.payload.shelf);
            return {
                ...state,
                all_books: updatedBooksShelf,
            };

        case "search": 
            return {
                ...state,
                search_books: action.payload
            }

        default: 
            return state;
    }
}

export const ContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, { all_books: [], search_books: [] },);

    const allReads = async() => {
        try {
            const all_books = await getAll();
            console.log(all_books);
            dispatch({type: "all_reads", payload: all_books});
        } catch(e) {
            console.log(e)
        }
    }

    const getSearchedResult = async (searchTerm) => {
        try {
            const result = await search(searchTerm);
            console.log(result)
            dispatch({type: "search", payload: result})
        } catch(e) {
            console.log(`error is ${e}`)
        }
    }

    const setShelf = (id, shelf) => {
        console.log("working")
        dispatch({type: "setShelf", payload: {id, shelf}})
    }

    return <Context.Provider value={{state, allReads, setShelf, getSearchedResult}}>
        {children}
    </Context.Provider>
    
};

export default Context

