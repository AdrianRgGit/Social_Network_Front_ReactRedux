import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PostCard.scss";

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


const PostCard = ({
    textTitle = "post.title",
    textLikes = "post.likes.length",
    srcImage = "post.image_url",
}) => {

    return (
<div>
           <Card maxW="md" className="post-card-container">
             <CardHeader className="post-card-header-container">
             {/* {post.title} */}
               <Text>{textTitle}</Text> 
               {/* {post.likes.length} */}
               <Text>Likes {textLikes}</Text>
             </CardHeader>
               <Image objectFit="cover" src={srcImage} alt="Chakra UI" />
          </Card>
</div>
        );
    };

// const PrintPosts = () => {
//   const { posts, isLoading } = useSelector((state) => state.posts);

//   if (isLoading) {
//     return <Spinner />;
//   }

//   const allPosts = posts.map((post) => {
//     return (
//       <div key={post._id} className="card-container">
//         <Link to={"/postdetail/" + post._id}>
//           <Card maxW="md" className="post-container">
//             <CardHeader className="post-header-container">
//               <Text>{post.title}</Text>
//               <Text>Likes {post.likes.length}</Text>
//             </CardHeader>
//               <Image objectFit="cover" src={post.image_url} alt="Chakra UI" />

//             <CardFooter
//             className="post-footer-container"
//               justify="space-between"
//               flexWrap="wrap"
//               sx={{
//                 "& > button": {
//                   minW: "136px",
//                 },
//               }}
//             >
//               <Flex spacing="4">
//                 <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
//                   <Avatar
//                     name={post.userId?.username}
//                     src={post.userId?.avatar_url}
//                   />

//                   <Box>
//                     <Heading size="sm">{post.userId?.username}</Heading>
//                   </Box>
//                 </Flex>
//               </Flex>
//             </CardFooter>
//           </Card>
//         </Link>
//       </div>
//     );
//   });
//   return <div>{allPosts}</div>;
// };

export default PostCard;
