import "./profile.scss";
import React, { useEffect, useState } from "react";
import { getUserLogged, updateUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { deletePost } from "../../features/posts/postsSlice";
import {
  Button,
  ButtonGroup,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalRender from "../ModalRender/ModalRender";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);
  const { username, email, followers, postIds, avatar_url, avatar } = user;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userEdit, setUserEdit] = useState({});
  const navigate = useNavigate();

  //console.log("user before useEffect", user);

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  if (isLoading) {
    return <span>cargando</span>;
  }

  //FIXME: utilizar en el form para actualizar user
  const onChange = (e) =>
    setUserEdit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile.name);
    setUserEdit((prevState) => ({
      ...prevState,
      avatar: selectedFile.name,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (title === "" || body === "" || !image) {
    //   return notification.error({
    //     message: "Rellene los campos y seleccione una imagen",
    //   });
    // }

    // const formDataToSend = new FormData();
    // formDataToSend.append("username", username);
    // formDataToSend.append("email", email);
    // formDataToSend.append("avatar", avatar);

    try {
      console.log(userEdit);
      dispatch(updateUser(userEdit));
      // notification.success({
      //   message: "User updated successfully",
      // });
      console.log("User update success notification");
      //TODO: cerrar modal y refrescar pagina
    } catch (error) {
      console.error("Error updating user:", error);
      // notification.error({
      //   message: "Error updating user",
      // });
    }
  };

  return (
    <>
      <div className="container-profile">
        <div className="card-profile-data">
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="filled"
          >
            <div className="container-img-profile">
              {avatar_url ? (
                <Image
                  className="img-profile"
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={avatar_url}
                  alt="avatar-profile-image"
                />
              ) : (
                <div></div>
              )}
            </div>
            <Stack>
              <CardBody>
                <Heading title="Profile" size="lg">
                  {username}
                </Heading>
                <div className="profile-data">
                  <Text py="2">Email: {email}</Text>
                  <Text py="2">
                    Followers: {followers ? followers.length : "0"}
                  </Text>
                  <Text py="2">
                    Following: hay que hacer la logica en bakcend
                  </Text>
                </div>
              </CardBody>

              <CardFooter>
                <div className="modal-profile">
                  <ModalRender
                    modalTitle={"Change image"}
                    textBtn={"Change image"}
                    text={
                      <>
                        <form onSubmit={onSubmit}>
                          <input
                            type="file"
                            name="avatar"
                            accept="image/*,video/*"
                            onChange={handleFileChange}
                          />
                          <button type="submit">Send</button>
                        </form>
                      </>
                    }
                  />
                </div>

                <div className="modal-profile">
                  <ModalRender
                    modalTitle={"Update user"}
                    textBtn={"Update user"}
                    text={
                      <>
                        <form onSubmit={onSubmit}>
                          <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="username"
                            onChange={onChange}
                          />
                          <input
                            type="text"
                            name="email"
                            value={email}
                            placeholder="email"
                            onChange={onChange}
                          />
                          <button type="submit">Send</button>
                        </form>
                      </>
                    }
                  />
                </div>

                <Button variant="solid" colorScheme="blue">
                  Add Post
                  {/* useNavigate to addpost (ocultar comp en header) */}
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </div>
      </div>
      <div className="container-post-profile">
        {/* //FIXME: le he puesto el ? porque sino al recargar post es undifined */}
        {postIds?.map((post) => {
          return (
            <div key={post._id}>
              <Card className="card-profile-post">
              <div className="container-img-post">
              {post.image_url ? (
                <Image
                  className="img-post"
                  objectFit="cover"
                  maxW={{ base: "100%", sm: "200px" }}
                  src={post.image_url}
                  alt="post-image"
                />
              ) : (
                <div></div>
              )}
            </div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div>
                  <button onClick={() => console.log(post._id)}>
                    Borrar post
                  </button>
                  <button onClick={() => console.log("hola")}>
                    Actualizar post
                  </button>
                  <br />
                <button>
                  <Link to={"/profilepost/" + post._id}>Update Post</Link>
                </button>
              </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;

//TODO: Following hay que hacer la logica en bakend

//TODO: Falta trae comentarios y likes del post
// "postIds": [
//   {
//       "_id": "64faf39cb14b417e5e3988b4",
//       "title": "title post prueba 2",
//       "body": "Body prueba foto 2 beach",
//       "image": "1694167964671-dog-beach-1.jpeg",
//       "likes": [],
//       "userId": "64f9d819f052557b73482724",
//       "commentIds": [],
//       "image_url": "/assets/images/post/1694167964671-dog-beach-1.jpeg"
//   }
// ]
