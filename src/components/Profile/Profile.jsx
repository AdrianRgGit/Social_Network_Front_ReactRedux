import React, { useEffect } from "react";
import { getUserLogged } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./profile.scss";
import { Card } from "antd";
import { deletePost } from "../../features/posts/postsSlice";

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

  console.log("user after useEffect", user);

  return (
    <>
      <div>Profile</div>
      <div>
        <Card className="card-style" title={user.title} bordered={false}>
          <h1>{username}</h1>
          {avatar_url ? (
            <img alt="avatar-profile-image" src={avatar_url}></img>
          ) : (
            <div></div>
          )}
          {/* //TODO: */}
          <button onClick={() => alert("haz la FUNCION")}>
            add/change your avatar{" "}
          </button>
          {user.image_url ? (
            <img alt="user-image" src={user.image_url}></img>
          ) : (
            <div></div>
          )}
          <p>Email: {email}</p>
          <p>Followers: {followers ? followers.length : "0"}</p>
          <p>Following: hay que hacer la logica en bakcend</p>
          <p>posts hacer map o traer de componente</p>
        </Card>
        {/* //FIXME: le he puesto el ? porque sino al recargar post es undifined */}
        {postIds?.map((post) => {
          return (
            <Card key={post._id}>
              <div>
                <p>{post.title}</p>
                <p>{post.body}</p>
                <div>
                  <button onClick={() => console.log(post._id)}>
                    Borrar post
                  </button>
                  <button onClick={() => console.log("hola")}>
                    Actualizar post
                  </button>
                </div>
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
              </div>
            </Card>
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
