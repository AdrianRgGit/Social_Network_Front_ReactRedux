import "./PostCard.scss";

import {
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Avatar,
  Image,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";

const PostCard = ({
  textTitle = "post.title",
  textLikes = "post.likes.length",
  srcImage = "post.image_url",
  nameAvatar = "post.userId?.username",
  srcAvatar = "post.userId?.avatar_url",
  heading = "post.userId?.username",
}) => {
  return (
    <div>
      <Card maxW="md" className="post-container">
        <CardHeader className="post-header-container">
          <Text>{textTitle}</Text>
          <Text>Likes {textLikes}</Text>
        </CardHeader>
        <Image objectFit="cover" src={srcImage} alt="Chakra UI" />

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
              <Avatar name={nameAvatar} src={srcAvatar} />

              <Box>
                <Heading size="sm">{heading}</Heading>
              </Box>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostCard;
