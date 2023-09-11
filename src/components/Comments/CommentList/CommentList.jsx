// CommentList.js
import React from "react";
import LikeComment from "../../Comments/LikeComment/LikeComment";
import { Spinner } from "@chakra-ui/spinner";
import "./CommentList.scss";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const CommentList = () => {
  const { post } = useSelector((state) => state.posts);
  const { commentIds } = post;

  console.log(commentIds);
  console.log(post);

  if (!commentIds) {
    return <Spinner />;
  }

  if (commentIds.length === 0) {
    return (
      <div className="comments-container">
        <p>Comments:</p>
        <p>There are no comments yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="card-comments-container">
      Comments:
      {commentIds?.map((comment) => {
        return (
          <>
            <Card className="comments-container">
              <CardHeader>
                <Heading size="md">fdsgsdg</Heading>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Summary
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </>
        );
      })}
      <br />
      <button>Comment</button>
    </div>
  );
};

export default CommentList;
