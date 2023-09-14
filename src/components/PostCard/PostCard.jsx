import "./PostCard.scss";

import { Card, CardHeader, Image, Text } from "@chakra-ui/react";

const PostCard = ({
  textTitle = "post.title",
  textLikes = "post.likes.length",
  srcImage = "post.image_url",
}) => {
  return (
    <div>
      <Card maxW="md" className="post-card-container">
        <CardHeader className="post-card-header-container">
          <Text>{textTitle}</Text>
          <Text>Likes {textLikes}</Text>
        </CardHeader>
        <Image objectFit="cover" src={srcImage} alt="Chakra UI" />
      </Card>
    </div>
  );
};

export default PostCard;
