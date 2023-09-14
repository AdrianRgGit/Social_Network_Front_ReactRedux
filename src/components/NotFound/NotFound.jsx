import "./NotFound.scss";
import backgroundImage from "../../assets/images/NotFound.png";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="img-container">
        <img src={backgroundImage} alt="" />
      </div>
    </div>
  );
};

export default NotFound;
