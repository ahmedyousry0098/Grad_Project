import { useState, useEffect, useContext } from "react";
import BookShelfChanger from "../../Components/BookShelfChanger";
import Context from "../../Context/context";
import {Link} from "react-router-dom"

const SearchScreen = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const {state: {search_books}, getSearchedResult} = useContext(Context)

  useEffect(() => {
    
    if (searchTerm) {
      getSearchedResult(searchTerm)
    }
  }, [searchTerm])  

  return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              search_books? search_books.map((book) => {
                return <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div 
                          className="book-cover"
                          style={{
                            width: 150,
                            height: 220,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                          }}
                        ></div>

                        <BookShelfChanger 
                          selected={book.id}
                        />
                      </div>

                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors}</div>

                    </div>
                  </li>
              }): null
            } 
          </ol>
          
        </div>
      </div>
  )
};

export default SearchScreen;