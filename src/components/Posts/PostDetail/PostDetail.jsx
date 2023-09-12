import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import AddComment from "../../Comments/AddComment/AddComment";
import LikePost from "../LikePost/LikePost";
import "./PostDetail.scss";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Avatar,
  Image,
  IconButton,
  Box,
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import CommentList from "../../Comments/CommentList/CommentList"; // Importa el componente CommentList desde el mismo directorio

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
        <CardHeader className="detail-post-header-container">
          <Text>{post.title}</Text>
          <div className="like-container">
            <LikePost />
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
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      {printCard()}
      <div>
        <AddComment />
        <CommentList />
      </div>
    </>
  );
};

export default PostDetail;
