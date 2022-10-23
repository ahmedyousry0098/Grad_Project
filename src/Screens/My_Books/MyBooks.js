import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import {useContext, useEffect} from "react";
import Context from "../../Context/context"

const MyBooks = () => {

    const { state: {all_books}, allReads} = useContext(Context);

    useEffect( () => {
        if (all_books.length === 0) {
          allReads()
        }
      });

    return(
        <div className="list-books-content">
            <CurrentlyReading />
            <WantToRead />
            <Read />
            {/* <p>{all_books.map((book) => ` bookShelf: ${book.shelf} `)}</p> */}
        </div>
    )
};

export default MyBooks