import React, { useEffect } from "react";
import { getUserLogged } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./profile.scss";
import { Card } from "antd";
import { deletePost } from "../../features/posts/postsSlice";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);
  const { username, email, followers, postIds, avatar_url } = user;

  console.log("user before useEffect", user);

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  if (isLoading) {
    return <span>cargando</span>;
  }

  const gridStyle = {
    width: "50%",
    textAlign: "center",
  };

  return (
    <>
      <div className="container-card-profile">
        <Card title="Profile">
          <Card.Grid className="card-grid" style={gridStyle}>
            <div>
              <h1>{username}</h1>
              {avatar_url ? (
                <img
                  className="avatar"
                  alt="avatar-profile-image"
                  src={avatar_url}
                ></img>
              ) : (
                <div></div>
              )}
            </div>
          </Card.Grid>
          <Card.Grid hoverable={false} style={gridStyle}>
            <button onClick={() => alert("haz la FUNCION")}>
              {" "}
              {/* //TODO: */}
              add/change your avatar{" "}
            </button>
            <p>Email: {email}</p>
            <p>Followers: {followers ? followers.length : "0"}</p>
            <p>Following: hay que hacer la logica en bakcend</p>
          </Card.Grid>
        </Card>
      </div>
      <div className="container-post-profile">
        {/* //FIXME: le he puesto el ? porque sino al recargar post es undifined */}
        {postIds?.map((post) => {
          return (
            <div key={post._id}>
              <Card className="container-card-profile" bordered={true}>
                <div className="container-img-post">
                  {post.image_url ? (
                    <img
                      className="img-post"
                      alt="post-image"
                      src={post.image_url}
                    ></img>
                  ) : (
                    <div></div>
                  )}{" "}
                </div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div>
                  <button onClick={() => dispatch(deletePost(post._id))}>
                    Borrar post
                  </button>
                  <button>
                    <Link to={"/profilepost/" + post._id}>Update Post</Link>
                  </button>

                  <br />
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Profile;

//TODO: Following hay que hacer la logica en bakend

//TODO: Falta trae comentarios y likes del post
// "postIds": [
//   {
//       "_id": "64faf39cb14b417e5e3988b4",
//       "title": "title post prueba 2",
//       "body": "Body prueba foto 2 beach",
//       "image": "1694167964671-dog-beach-1.jpeg",
//       "likes": [],
//       "userId": "64f9d819f052557b73482724",
//       "commentIds": [],
//       "image_url": "/assets/images/post/1694167964671-dog-beach-1.jpeg"
//   }
// ]
