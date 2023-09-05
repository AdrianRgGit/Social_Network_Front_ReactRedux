import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./components/Register/Register";
import GetPosts from "./components/Posts/GetPosts/GetPosts";
import Header from "./components/Header/Header";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<GetPosts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
