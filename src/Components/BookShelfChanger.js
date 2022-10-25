import {useContext} from "react"
import Context from "../Context/context";

const BookShelfChanger = ({selected}) => {
      
    const { setShelf } = useContext(Context);

    return <div className="book-shelf-changer">
        <select 
            onChange= {(e) => setShelf(selected, e.target.value)}
        >
            <option value="none" disabled>
                Move to...
            </option>

            <option value="currentlyReading">
                Currently Reading
            </option>

            <option value="wantToRead" >
                    Want to Read
            </option>

            <option value="read" >
                Read
            </option>

            <option value="none" >
                None
            </option>
        </select>
    </div>
};

export default BookShelfChanger;