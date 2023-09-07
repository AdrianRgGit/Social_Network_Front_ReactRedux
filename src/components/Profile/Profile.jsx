import React, { useEffect } from "react";
import { getUserLogged } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);


  const { username, email, followers, avatar_url} = user;
  console.log(user)
  console.log(avatar_url)
  console.log(username);

  // const postsUser = postIds.map(post => ({
  //     key: post._id,
  // }))

  useEffect(() => {
    dispatch(getUserLogged());
  }, []);

  if (isLoading) {
    return <span>cargando</span>;
  }

  //   if (!userLogged) {
  //     return <span>cargando</span>;
  //   }

  return (
    <>
      <div>Profile</div>
      <div>
        <h1>{username}</h1>
        {/* <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img> */}
        <img alt="avatar-profile-image" src={avatar_url}></img>
        <p>Email: {email}</p>
        <p>Followers: {followers?.length}</p>
        <p>Following: hay que hacer la logica en bakcend</p>
        <p>posts hacer map o traer de componente</p>
      </div>
    </>
  );
};

export default Profile;

// cover={<img alt="image-lamp" src={product.image_url} />} // Cargar la imagen usando la URL

/*//TODO: multer foto perfil en bakcend en user loged, si que hay en register */
/*//TODO: Following hay que hacer la logica en bakcend */
/*//TODO: Followers hay que hacer la logica en bakcend */
/*//FIXME: Post no salen en el post, funciona en backend? probado en postman no va*/



