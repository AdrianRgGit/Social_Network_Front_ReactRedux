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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const HeaderDrawer = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    onClose()
    navigate("/login");

  };

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };


  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Open
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
          <DrawerBody>
            <nav className="nav-container">
              <div className="links-container">
                <Link to={"/"} onClick={onClose} >Home | </Link>
                {user ? (
                  <>
                    <span onClick={onLogout}>Logout | </span>
                    <span>
                      <Link to={`/profile`} onClick={onClose} >Profile | </Link>
                    </span>
                    <span>
                      <Link to={"/addpost"}>Add Post </Link>
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      <Link to={"/login"} onClick={onClose} >Login | </Link>
                    </span>
                    <span>
                      <Link to={"/register"} onClick={onClose} >Register | </Link>
                    </span>
                  </>
                )}
              </div>
              <div className="search-container">
                <input
                  // onClick={}
                  type="text"
                  onKeyUp={handleChange}
                  placeholder="Search"
                  name="text"
                />
              </div>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HeaderDrawer;
