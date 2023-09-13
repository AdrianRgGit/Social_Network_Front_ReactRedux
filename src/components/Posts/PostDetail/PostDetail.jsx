import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import AddComment from "../../Comments/AddComment/AddComment";
import LikePost from "../LikePost/LikePost";
import "./PostDetail.scss";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Avatar,
  Image,
  Box,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import CommentList from "../../Comments/CommentList/CommentList"; // Importa el componente CommentList desde el mismo directorio
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import ModalRender from "../../ModalRender/ModalRender";

const PostDetail = () => {
  const { _id } = useParams();
  const { post } = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(getById(_id));
        dispatch(reset());
      } catch (error) {
        console.error("hubo un problema");
      }
    }
    fetchData();
  }, []);

  if (!post) {
    return <Spinner />;
  }

  const printCard = () => {
    return (
      <Card maxW="md" className="detail-post-container">
        <CardHeader
          className="detail-post-header-container"
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={post.userId?.username}
                src={post.userId?.avatar_url}
              />

              <Box>
                <Heading size="sm">{post.userId?.username}</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody className="detail-post-body-container">
          <Text>{post.title}</Text>
        </CardBody>
        <Image objectFit="cover" src={post.image_url} alt="Chakra UI" />

        <CardFooter className="detail-post-footer-container">
          <Text>{post.body}</Text>
        </CardFooter>

        <div className="like-comment-container">
          <div className="like-container">
            <LikePost />
            <Text>{post.likes?.length}</Text>
          </div>
          <div>
            <ModalRender
              className="modal-btn"
              modalTitle={"Add comment"}
              textBtn={
                <FontAwesomeIcon
                  icon={faComment}
                  size="xl"
                  className="comment-icon"
                />
              }
              text={
                <>
                  <AddComment />
                </>
              }
            />
          </div>
        </div>
      </Card>
    );
  };

  return (
    <>
      {printCard()}
      <div>
        <CommentList />
      </div>
    </>
  );
};

export default PostDetail;
