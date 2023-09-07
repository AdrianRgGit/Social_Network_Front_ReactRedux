import React, { useEffect } from "react";
import { getUserLogged } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);


  const { username, email, followers, avatar_url} = user;
  console.log(user)

  // const postsUser = postIds.map(post => ({
  //     key: post._id,
  // }))

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  if (isLoading) {
    return <span>cargando</span>;
  }


  return (
    <>
      <div>Profile</div>
      <div>
        <h1>{username}</h1>
        { avatar_url ? <img alt="avatar-profile-image" src={avatar_url}></img> : <div></div> }   
        <p>Email: {email}</p>
        <p>Followers: {followers? followers.length : "0" }</p>
        <p>Following: hay que hacer la logica en bakcend</p>
        <p>posts hacer map o traer de componente</p>
      </div>
    </>
  );
};

export default Profile;



/*//TODO: Following hay que hacer la logica en bakend */
/*//FIXME: Post no salen en el post, funciona en backend? probado en postman no va*/



