import "./profile.scss";
import React, { useEffect, useState } from "react";
import { getUserConnected, updateUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { deletePost } from "../../features/posts/postsSlice";
import {
  Button,
  ButtonGroup,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ModalRender from "../ModalRender/ModalRender";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();

  const { userConnected, user, isLoading } = useSelector((state) => state.auth);
  const { username, email, followers, postIds, avatar_url, avatar } = userConnected;
  console.log(userConnected)

  const [userEdit, setUserEdit] = useState({
    username: username || "", // Asigna el valor actual o una cadena vacía, es importante inicilizar el estado de un input
    email: email || "", // Asigna el valor actual o una cadena vacía
  });

  
  // const navigate = useNavigate();

  useEffect(() => {
  console.log("Eee")
    dispatch(getUserConnected());
  }, [avatar]);

<<<<<<< HEAD
=======
 
>>>>>>> develop
  if (isLoading) {
    return <span>cargando...</span>;
  }

  //FIXME: utilizar en el form para actualizar user
  const handleInputChange = (e) =>
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
    try {
      console.log(userEdit);
      console.log(_id)
      dispatch(updateUser(_id, userEdit));
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
                            value={userEdit.username}
                            placeholder="username"
                            onChange={handleInputChange}
                          />
                          <input
                            type="text"
                            name="email"
                            value={userEdit.email}
                            placeholder="email"
                            onChange={handleInputChange}
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
                  <button onClick={() => dispatch(deletePost(post._id))}>
                    Borrar post
                  </button>
                  <button>
                    <Link to={"/profilepost/" + post._id}>Update Post</Link>
                  </button>

                  <br />
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
