import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Components/Home";
import { ListingPage } from "./Components/ListingPage";
import { CreateListingPage } from "./Components/CreateListingPage";
import { Table } from "./Components/dfdfgdfg";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/listing/:id" element={<ListingPage />}></Route>
      <Route path="/listing/create" element={<CreateListingPage />}></Route>
    </Routes>
  );
}

export default App;
