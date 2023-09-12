import React, { useEffect, useState } from "react";
import PostDetail from "../PostDetail/PostDetail";
import CommentList from "../../Comments/CommentList/CommentList";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import LikePost from "../LikePost/LikePost";
import { notification } from "antd";
import { getById, updatePost } from "../../../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePost = () => {
  const { post } = useSelector((state) => state.posts);
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const { title, body } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [resize] = React.useState("horizontal");

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(getById(_id));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (title === "" || body === "") {
      return notification.error({
        message: "Rellene los campos y seleccione una imagen",
      });
    }

    dispatch(updatePost(_id, formData));

    notification.success({
      message: "Post creado con éxito",
    });
    navigate("/profile");
  };

  return (
    <>
      <Card maxW="md" className="detail-post-container">
        <CardHeader className="detail-post-header-container">
          <Text>{post.title}</Text>
          <div className="like-container">
            <Text>{post.likes?.length}</Text>
          </div>
        </CardHeader>
        <Image objectFit="cover" src={post.image_url} alt="Chakra UI" />

        <CardFooter
          className="detail-post-footer-container"
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <div className="form-container">
            <form onSubmit={onSubmit} className="form">
              <FormControl className="form-title-container">
                <Input
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={onChange}
                />
              </FormControl>

              <Textarea
                name="body"
                placeholder="Comment"
                size="sm"
                resize={resize}
                onChange={onChange}
              />

              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfilePost;
