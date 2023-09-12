import "./profile.scss";
import React, { useEffect, useState } from "react";
import { getUserConnected, updateUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { deletePost, getPosts } from "../../features/posts/postsSlice";
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
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const { userConnected, isLoading } = useSelector((state) => state.auth);
  const { username, email, password, followers, postIds, avatar_url, avatar } =
    userConnected;

  const [userEdit, setUserEdit] = useState({
    username: username || "", // Asigna el valor actual o una cadena vacía, es importante inicilizar el estado de un input
    email: email || "", // Asigna el valor actual o una cadena vacía
    avatar: avatar || "", // Asigna el valor actual o vacio
  });

  // const navigate = useNavigate();

  //FIXME: hace 2 veces la peticion de getsuerconnected
  useEffect(() => {
    dispatch(getUserConnected());

    // Inicializar el estado de userEdit con los valores actuales del usuario conectado
    setUserEdit({
      username: username || "",
      email: email || "",
      avatar: avatar || "",
    });
  }, [avatar, username, email]);

  if (isLoading) {
    return <span>cargando...</span>;
  }

  //TODO: Nota. No utilizar un form si vas a subir/editar fotos > hay que usar un FORM-DATA (como en postman)

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      console.log("userEdit:", userEdit, "formData:", formData);
      if (event.target.avatar.files[0])
        formData.set("avatar", event.target.avatar.files[0]);
      formData.set("username", event.target.username.value);
      formData.set("email", event.target.email.value);

      //addProduct(formData) > sustituye por el dispatch y la funcion(formData)
      dispatch(updateUser(formData));
      console.log("userEdit:", userEdit, "formData:", formData);
    } catch (error) {
      console.error("Error updating user:", error);
      // notification.error({
      //   message: "Error updating user",
      // });
    }
  };

  //TODO: cerrar modal y refrescar pagina

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
                    modalTitle={"Update user"}
                    textBtn={"Edit profile"}
                    text={
                      <>
                        <form
                          className="form-updateUser"
                          onSubmit={handleSubmit}
                        >
                          <input
                            type="text"
                            name="username"
                            placeholder={userEdit.username}
                          />
                          <input
                            type="text"
                            name="email"
                            placeholder={userEdit.email}
                          />
                          <input
                            type="file"
                            name="avatar"
                            id="file"
                            className="input-avatar"
                          />
                          <label
                            htmlFor="file"
                            className="btn btn-tertiary js-labelFile"
                          >
                            <i className="icon fa fa-check"></i>
                            <span className="js-fileName">Choose a file</span>
                          </label>
                          <Button
                            type="submit"
                            variant="solid"
                            colorScheme="blue"
                          >
                            Send
                          </Button>
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
