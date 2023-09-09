import { Card, Spin } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


const PrintPosts = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) {
    return <Spin />;
  }

  const allPosts = posts.map((post) => {
    return (
      <div key={post._id}>
        <Link to={"/postdetail/" + post._id}>
          {/* Me da el error de la key > solucion meter key en el div */}
          <Card className="card-style" title={post.title} bordered={false}>
            {post.image_url ? (
              <img alt="post-image" src={post.image_url}></img>
            ) : (
              <div></div>
            )}
            <p>Descripción: {post.body}</p>
            <p>Posted by: {post.userId?.username}</p>
            <p>Likes: {post.likes.length}</p>
            {/*El interrogante de aquí se debe de eliminar */}
          </Card>
        </Link>
      </div>
    );
  });
  return <div>{allPosts}</div>;
};

export default PrintPosts;
