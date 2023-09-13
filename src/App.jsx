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
import LikePost from "./components/Posts/LikePost/LikePost";
import ProfilePost from "./components/Posts/ProfilePost/ProfilePost";
import PostCard from "./components/PostCard/PostCard";
import PrivateZone from "./guards/PrivateZone";
import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateZone>
                <Profile />
              </PrivateZone>
            }
          />
          <Route
            path="/postdetail/:_id"
            element={
              <PrivateZone>
                <PostDetail />
              </PrivateZone>
            }
          />
          <Route
            path="/profilepost/:_id"
            element={
              <PrivateZone>
                <ProfilePost />
              </PrivateZone>
            }
          />
          <Route
            path="/addpost"
            element={
              <PrivateZone>
                <AddPost />
              </PrivateZone>
            }
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<GetPosts />} />
          <Route path="/search/:title" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/like/:_id" element={<LikePost />} />
          <Route path="/postcard" element={<PostCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
