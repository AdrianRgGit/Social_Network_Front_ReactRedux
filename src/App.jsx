import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
<<<<<<< HEAD
import Posts from "./components/Posts/Posts";

function App() {
  return (
    <>
      <Posts />
    </>
=======
import Register from "./components/Register/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
>>>>>>> 2c425d95c308998d20802a8ecb473a39b2b2fab8
  );
}

export default App;
