import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById, reset } from "../../../features/posts/postsSlice";
import AddComment from "../../Comments/AddComment/AddComment";
import LikePost from "../LikePost/LikePost";
import LikeComment from "../../Comments/LikeComment/LikeComment";

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

// ! Que sólo se muestre el formulario de hacer un comentario cuando le de al botón de comment
// ! Que salga el nombre del usuario que ha comentado
// ! No me va al hacer un subcomponente para los comentarios

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

  const printCard = () => {
    return (
      <Card maxW="md">
        <CardHeader>
          <Text fontSize="3xl">{post.title}</Text>
        </CardHeader>
        <CardBody>
          <Text>{post.body}</Text>
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
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar
                name={post.userId?.username}
                src={post.userId?.avatar_url}
              />
              <Box>
                <Heading size="sm">{post.userId?.username}</Heading>
                <Text fontSize="xs">
                  Followers: {post.userId?.followers.length}
                </Text>
                <br />
              </Box>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
      // <Card
      //   className="card-style"
      //   key={post._id}
      //   title={post.title}
      //   bordered={false}
      // >
      //   <div className="post-container">
      //     <p>Descripción: {post.body}</p>
      //     {post.image ? (
      //       <img alt="post-image" src={post.image_url}></img>
      //     ) : (
      //       <div></div>
      //     )}
      //     <p>Likes: {post.likes?.length}</p>
      //   </div>
      //   <LikePost />
      //   {/* <CommentList comments={post.commentIds} /> */}
      //   <br />
      //   <div className="comments-container">
      //     Comments:
      //     {post.commentIds?.map((comment) => {
      //       return (
      //         <div key={comment._id}>
      //           <div>Title: {comment.title}</div>
      //           <div>Body: {comment.body}</div>
      //           <div>Likes: {comment.likes.length}</div>
      //           <br />
      //           <LikeComment key={comment._id} comment={comment} />
      //         </div>
      //       );
      //     })}
      //     <br />
      //     <button>Comment</button>
      //   </div>
      // </Card>
    );
  };

  if (post.commentIds?.length === 0) {
    const message = "Todavía no hay ningún comentario ¡Se el primero!";
    return <>{printCard(message)}</>;
  }

  return (
    <>
      {printCard()}
      <div>
        <AddComment />
      </div>
    </>
  );
};

export default PostDetail;
