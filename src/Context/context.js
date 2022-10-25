import React, {useReducer} from "react";
import {getAll, update, search} from "../Api/BooksAPI";

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "all_reads":
            return {
                ...state, 
                all_books: action.payload
            };

        case "set_shelf":
            let x = action.payload.shelf === "none"? state.search_books: state.all_books;
            const updatedBooks = x.map((book) => {
                if (book.id === action.payload.id) {
                  book.shelf = action.payload.shelf;
                }
                return book;
            });

            update({ id: action.payload.id }, action.payload.shelf); 

            return {
            ...state,
            all_books: updatedBooks,
            };

        case "search": 
            return {
                ...state,
                search_books: action.payload,
            }

        default: 
            return state;
    }
}

export const ContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, { all_books: [], search_books: [], updateMyBooks: false },);

    const allReads = async() => {
        try {
            const all_books = await getAll();
            dispatch({type: "all_reads", payload: all_books});
        } catch(e) {
            console.log(`allReadsErr: ${e}`)
        }
    }

    const getSearchedResult = async (searchTerm) => {
        try {
          if (!searchTerm) {
            return dispatch({ type: 'search', payload: [] });
          }
          const result = await search(searchTerm);
          if (result?.error === 'empty query') {
            return dispatch({ type: 'search', payload: [] });
          }
          dispatch({ type: 'search', payload: result });
        } catch (e) {
          console.log(`error is ${e}`);
        }
      };
    

    const setShelf = (id, shelf) => {
        dispatch({type: "set_shelf", payload: {id, shelf}})
    }

    return <Context.Provider value={{state, allReads, setShelf, getSearchedResult}}>
        {children}
    </Context.Provider>
    
};

export default Context

