import "./App.css";
import SearchScreen from "./Screens/Search_Screen/SearchScreen";
import MyBooks from "./Screens/My_Books/MyBooks";
import {Routes, Route} from "react-router-dom" 

function App() {
  

  return (
    <Routes>
      <Route exact path="/" element={<MyBooks />}/>
      <Route exact path="/search" element={<SearchScreen />} />
    </Routes>
  );
}

export default App;
