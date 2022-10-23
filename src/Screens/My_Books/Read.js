import {useContext} from "react";
import Context from "../../Context/context";
import BookShelfChanger from "../../Components/BookShelfChanger";

const Read = () => {

    const {state: {all_books}} = useContext(Context)

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        all_books.filter((book) => book.shelf === "read").map((book) => {
                            return <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage: `url(${book.imageLinks.thumbnail})`,
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

export default Read