import "./App.css";
import { useState } from "react";
import SearchScreen from "./Screens/Search_Screen/SearchScreen";
import MyBooks from "./Screens/My_Books/MyBooks";
// import Context from "./Context/context"

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  return (
    <div className="app">
      {
        showSearchPage 
        ? <SearchScreen 
            onSwitch={() => setShowSearchpage(!showSearchPage)}
          />
        : 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <MyBooks />
            
            <div className="open-search">
              <a href onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
            </div>
          </div>
        }
      </div>
  );
}

export default App;
