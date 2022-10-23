import {useContext} from "react"
import Context from "../Context/context";

const BookShelfChanger = ({selected}) => {
      
    const { currentlyReading, wantToRead, read } = useContext(Context);

    const handleChange = (value) => {
        switch (value) {
            case "currentlyReading":
                return currentlyReading(selected, {shelf: "currentlyReading"});

            case "wantToRead":
                return wantToRead(selected, {shelf: "wantToRead"});

            case "read":
                return read(selected, {shelf: "read"})

            default: 
                return null;
        }
    }
    
    return <div className="book-shelf-changer">
        <select 
            onChange= {(e) => handleChange(e.target.value)}
        >
            <option value="none" disabled>
                Move to...
            </option>

            <option value="currentlyReading" id="currentlyReading"
            >
                Currently Reading
            </option>

            <option value="wantToRead" id="wantToRead">
                    Want to Read
            </option>

            <option value="read" id="read">
                Read
            </option>

            <option value="none" id="none">
                None
            </option>
        </select>
    </div>
};

export default BookShelfChanger;