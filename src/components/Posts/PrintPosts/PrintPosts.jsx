import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

const PrintPosts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) {
    return <Spinner />;
  }

  const allPosts = posts.map((post) => {
    console.log(post);
    return (
      <div key={post._id}>
        <Link to={"/postdetail/" + post._id}>
          {/* Me da el error de la key > solucion meter key en el div */}
          <Card maxW="md">
            <CardHeader>
              <Text fontSize="3xl">{post.title}</Text>
              <Text fontSize="3x1">Likes {post.likes.length}</Text>
            </CardHeader>
            <CardBody>
              <Image objectFit="cover" src={post.image_url} alt="Chakra UI" />
            </CardBody>

            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              {" "}
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
        </Link>
      </div>
    );
  });
  return <div>{allPosts}</div>;
};

export default PrintPosts;
