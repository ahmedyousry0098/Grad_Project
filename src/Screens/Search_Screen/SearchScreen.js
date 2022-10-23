import { useState, useContext } from "react";
import BookShelfChanger from "../../Components/BookShelfChanger";
import Context from "../../Context/context";

const SearchScreen = ({onSwitch}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const {state: {all_books}} = useContext(Context);

  const books_list = !searchTerm ? all_books : all_books.filter((book) => {
        return book.title.toLowerCase().includes(searchTerm.trim().toLowerCase())  
      });

  return (
      <div className="search-books">
        <div className="search-books-bar">
          <div 
            href
            className="close-search"
            onClick={onSwitch}
          >
            Close
          </div>
          
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN"
              value={searchTerm}
              onChange={(n) => setSearchTerm(n.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books_list.map((book) => {
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
              })
            }
          </ol>
          
        </div>
      </div>
  )
};

export default SearchScreen;