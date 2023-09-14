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
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

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
      {commentIds?.map((comment, i) => {
        return (
          <div key={i}>
            <Card className="comments-container">
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
                      name={comment.userId.username}
                      src={comment.userId.avatar_url}
                    />

                    <Box>
                      <Heading size="sm">{comment.userId.username}</Heading>
                    </Box>
                  </Flex>
                </Flex>
              </CardFooter>
            </Card>
          </div>
        );
      })}
      <br />
    </div>
  );
};
export default CommentList;
