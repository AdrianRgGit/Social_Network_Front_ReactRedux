import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import BtnTop from "../BtnTop/BtnTop";
import "./Header.scss";
import { getPosts } from "../../features/posts/postsSlice";
import logoImg from "../../assets/images/Pets1.png";
import logoImgText from "../../assets/images/Petspierince1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBone, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import birdHouseIcon from "../../assets/svg/birdHouseIcon.svg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userConnected } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
    onClose();
  };

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);

    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  return (
    <nav className="nav-container">
      <div className="container-drawer">
        <>
          <Button
            className="btn-drawer-header"
            // colorScheme="blue"
            onClick={onOpen}
          >
           <FontAwesomeIcon icon={faBars} size= "lg" style={{color: "rgb(239, 98, 98)"}} />
          </Button>
          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <div className="drawerHeader-logo">
                  <img alt="image logo" src={logoImg} />
                  <img alt="image logo" src={logoImgText} />
                </div>
              </DrawerHeader>
              <DrawerBody>
                <nav className="nav-container">
                  <div className="search-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                      className="search"
                      type="text"
                      onKeyUp={handleChange}
                      placeholder="Search"
                      name="text"
                    />
                  </div>
                  <div className="links-container">
                    <Link to={"/"} onClick={onClose}>
                      <img
                        className="icon"
                        src={birdHouseIcon}
                        alt="birdHouseIcon"
                      />
                    </Link>
                    {userConnected ? (
                      <>
                        <span>
                          <Link to={`/profile`} onClick={onClose}>
                            Profile{" "}
                          </Link>
                        </span>
                        <span>
                          <Link to={"/addpost"} onClick={onClose}>
                            Add Post{" "}
                          </Link>
                        </span>
                        <span onClick={onLogout}>Logout</span>
                      </>
                    ) : (
                      <>
                        <span>
                          <Link to={"/login"} onClick={onClose}>
                            Login{" "}
                          </Link>
                        </span>
                        <span>
                          <Link to={"/register"} onClick={onClose}>
                            Register{" "}
                          </Link>
                        </span>
                      </>
                    )}
                  </div>
                </nav>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      </div>
      <BtnTop />
    </nav>
  );
};

export default Header;
