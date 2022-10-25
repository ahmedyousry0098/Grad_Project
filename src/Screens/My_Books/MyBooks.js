import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import Read from "./Read";
import {useContext, useEffect} from "react";
import {Link} from "react-router-dom"
import Context from "../../Context/context"

const MyBooks = () => {

    const { state: {all_books}, allReads } = useContext(Context);


    useEffect( () => {
        if (all_books.length === 0) {
          allReads();
        }
      });

    return(
      <div className="app">

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        </div>

        <div className="list-books-content">
          <CurrentlyReading />
          <WantToRead />
          <Read />
          
          <div className="open-search">
            <Link to="/search">Search</Link>
          </div>
          
        </div>
          
      </div>
    )
};

export default MyBooks