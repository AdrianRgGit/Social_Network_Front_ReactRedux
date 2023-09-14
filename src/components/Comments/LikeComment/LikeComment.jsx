import { useDispatch } from "react-redux";
import { dislike, like } from "../../../features/comment/CommentSlice";

const LikeComment = (props) => {
  const { comment } = props;
  const dispatch = useDispatch();


  return (
    <div className="button-container">
      <button onClick={() => dispatch(like(comment._id))}>Like</button>
      <button onClick={() => dispatch(dislike(comment._id))}>Dislike</button>
    </div>
  );
};

export default LikeComment;
