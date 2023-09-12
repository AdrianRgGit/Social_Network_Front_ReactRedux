// CommentList.js
import React, { useEffect } from "react";
import LikeComment from "../../Comments/LikeComment/LikeComment";
import { Spinner } from "@chakra-ui/spinner";
import "./CommentList.scss";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const CommentList = () => {
  const { post } = useSelector((state) => state.posts);
  const { commentIds } = post;

  if (!commentIds) {
    return <Spinner />;
  }

  if (commentIds.length === 0) {
    return (
      <Card className="no-comments-container">
        <CardHeader>
          <Heading size="sm">No comments yet. Be the first!</Heading>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="card-comments-container">
      {commentIds?.map((comment) => {
        return (
          <>
            <Card className="comments-container" key={comment._id}>
              <CardHeader>
                <Heading size="sm">{comment.title}</Heading>
              </CardHeader>

              <CardBody>
                <Stack>
                  <Box>
                    <Text pt="2" fontSize="sm">
                      {comment.body}
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
              <CardFooter
                className="post-footer-container"
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
                    // Este avatar es del usuario que ha hecho el post. Habría que cambiarlo al de la persona que ha hecho el comentario
                      name={post.userId?.username}
                      src={post.userId?.avatar_url}
                    />

                    <Box>
                      {/* No se como poner el nombre del usuario que ha hecho el comentario */}
                      <Heading size="sm">Usuario Prueba</Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardFooter>
            </Card>
          </>
        );
      })}
      <br />
    </div>
  );
};
export default CommentList;
