import "./profile.scss";
import React, { useEffect, useState } from "react";
import { getUserConnected, updateUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  ButtonGroup,
  Divider,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import ModalRender from "../ModalRender/ModalRender";
import { Card, CardBody, CardFooter } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../PostCard/PostCard";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userConnected, isLoading } = useSelector((state) => state.auth);
  const { username, email, followers, postIds, avatar_url, avatar } =
    userConnected;

  useEffect(() => {
    dispatch(getUserConnected());
  }, [avatar, username, email]);

  if (isLoading) {
    return <Spinner size="lg" color="red.500" />;
  }

  //TODO: Nota. No utilizar un form si vas a subir/editar fotos > hay que usar un FORM-DATA (como en postman)

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    try {
      if (event.target.avatar.files[0])
        formData.set("avatar", event.target.avatar.files[0]);
      formData.set("username", event.target.username.value);
      formData.set("email", event.target.email.value);

      dispatch(updateUser(formData));
    } catch (error) {
      // notification.error({
      //   message: "Error updating user",
      // });
    }
  };

  return (
    <>
      <div className="container-profile">
        <div className="card-profile-data">
          <Card className="card-profile-data"
            direction={{ base: "column", sm: "row" }}
            //overflow="hidden"
            variant = "unstyled"
            size = "lg"
          >
            <div className="container-img-profile">
              <div className="img-profile">
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
            </div>

            <Stack className="profile-data" spacing='4'>

              <CardBody >
                <Heading  title="Profile" size="lg">
                  {username}
                </Heading>
                <div >
                  <Text py="2">{email}</Text>
                  <Text py="2">
                    Followers: {followers ? followers.length : "0"}
                  </Text>
                  {/* <Text py="2">
                    Following: hay que hacer la logica en bakcend
                  </Text> */}
                </div>
              </CardBody>
            

              <CardFooter className="footer-card-profile">
                <div className="modal-profile">
                  <ModalRender
                    modalTitle={"Edit your profile"}
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
                            placeholder={username}
                            defaultValue={username}
                          />
                          <input
                            type="text"
                            name="email"
                            placeholder={email}
                            defaultValue={email}
                          />
                          <input
                            type="file"
                            name="avatar"
                            id="file"
                            className="input-avatar"
                          />
                          {/* <label
                            htmlFor="file"
                            className="btn btn-tertiary js-labelFile"
                          >
                            <i className="icon fa fa-check"></i>
                            <span className="js-fileName">Choose a file</span>
                          </label> */}
                          <Button
                            className="btn-card"
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

                <Button
                  className="btn-card"
                  onClick={() => navigate("/addpost")}
                  variant="solid"
                  colorScheme="blue"
                >
                  Add Post
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </div>

        <Divider className="divider-profile"/>

        <div className="container-post-profile">
          {/* //FIXME: le he puesto el ? porque sino al recargar post es undifined */}
          {postIds?.map((post, i) => {
            return (
              <div key={i}>
                <Link to={"/profilepost/" + post._id}>
                  <PostCard
                    textTitle={post.title}
                    textLikes={post.likes?.length}
                    srcImage={post.image_url}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;

//TODO: Following hay que hacer la logica en bakend

//TODO: Ir a la vista detalle al clicar en el post y que se llene con todo
