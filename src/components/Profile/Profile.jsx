import React, { useEffect } from "react";
import { getUserLogged } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { userLogged } = useSelector((state) => state.auth);

  console.log(userLogged);

  const { username, email, followers, postIds } = userLogged;

  console.log(postIds);

  // const postsUser = postIds.map(post => ({
  //     key: post._id,

  // }))

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  //   if (!user) {
  //     return <Spin indicator={antIcon} />;
  //   }

  return (
    <div>
      Profile
      <h1>{username}</h1>
      {/*//TODO: multer foto en bakcend en user loged, si que hay en register */}
      <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
      <p>
        <strong>Email: {email}</strong>
      </p>
      <p>
        <strong>Followers: {followers}</strong>
      </p>
      {/*//TODO: Following hay que hacer la logica en bakcend */}
      <p>
        <strong>Following: {email}</strong>
      </p>
      {/*//FIXME: Post no salen en el post, funciona en backend? probado en postman no va*/}
      <p>
        <strong>Posts: {postIds}</strong>
      </p>
    </div>
  );
};

export default Profile;
