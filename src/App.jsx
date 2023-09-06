import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./components/Register/Register";
import GetPosts from "./components/Posts/GetPosts/GetPosts";
import Header from "./components/Header/Header";
import PostDetail from "./components/Posts/PostDetail/PostDetail";
import Search from "./components/Search/Search";
import Login from "./components/Login/Login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<GetPosts />} />
          <Route path="/postdetail/:_id" element={<PostDetail />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
