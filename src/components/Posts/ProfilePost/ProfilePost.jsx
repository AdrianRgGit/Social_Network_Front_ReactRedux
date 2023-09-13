import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  deletePost,
  getById,
  updatePost,
} from "../../../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./ProfilePost.scss";
import ModalRender from "../../ModalRender/ModalRender";

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

    dispatch(updatePost({ _id, formData }));

    notification.success({
      message: "Post created",
    });
    navigate("/profile");
  };

  const deleteProfilePost = () => {
    dispatch(deletePost(post._id));
    notification.success({
      message: "Post deleted",
    });
    setTimeout(navigate("/profile"), 1000);
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

        <CardBody className="body-container">
          <Text>{post.body}</Text>
        </CardBody>

        <ModalRender
          className="modal-btn"
          modalTitle={"Add comment"}
          textBtn={"Update"}
          text={
            <>
              <div className="form-container">
                <form onSubmit={onSubmit} className="form">
                  <FormControl className="form-title-container">
                    <Input
                      type="text"
                      name="title"
                      placeholder="Title"
                      onChange={onChange}
                      defaultValue={post.title}
                    />
                  </FormControl>

                  <Textarea
                    name="body"
                    placeholder="Body"
                    size="sm"
                    resize={resize}
                    onChange={onChange}
                    defaultValue={post.body}
                  />
                  <div className="buttons-container">
                    <Button mt={4} colorScheme="teal" type="submit">
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </>
          }
        />
        <Button
          mt={4}
          colorScheme="red"
          onClick={() => deleteProfilePost(post._id)}
        >
          Delete
        </Button>
      </Card>
    </>
  );
};

export default ProfilePost;
