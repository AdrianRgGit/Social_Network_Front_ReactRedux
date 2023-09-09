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
    console.log(post)
    return (
      <div key={post._id}>
        <Link to={"/postdetail/" + post._id}>
          {/* Me da el error de la key > solucion meter key en el div */}
          <Card maxW="md">
            <CardHeader>
              <Text fontSize="3xl">{post.title}</Text>
            </CardHeader>
            <CardBody>
              <Text>{post.body}</Text>
            </CardBody>
            <Image
              objectFit="cover"
              src={post.image_url}
              alt="Chakra UI"
            />

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
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />

                  <Box>
                    <Heading size="sm">Segun Adebayo</Heading>
                  </Box>
                </Flex>
                <IconButton
                  variant="ghost"
                  colorScheme="gray"
                  aria-label="See menu"
                />
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
