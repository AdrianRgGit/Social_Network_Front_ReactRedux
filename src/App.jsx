import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Register from "./components/Register/Register";
import Header from "./components/Header/Header";
import PostDetail from "./components/Posts/PostDetail/PostDetail";
import Search from "./components/Search/Search";
import Login from "./components/Login/Login";
import GetPosts from "./components/Posts/GetPosts/GetPosts";
import AddPost from "./components/Posts/AddPost/AddPost";
import Profile from "./components/Profile/Profile";
import UserPosts from "./components/Posts/UserPosts/UserPosts";
import LikePost from "./components/Posts/LikePost/LikePost";
import AddComment from "./components/AddComment/AddComment";
import Comments from "./components/Comments/Comments";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/posts" element={<GetPosts />} />
          <Route path="/postdetail/:_id" element={<PostDetail />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/userposts" element={<UserPosts />} />
          <Route path="/like/:_id" element={<LikePost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
