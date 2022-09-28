import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../../components/comments/CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { quotesId } = useParams();


  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentHandlerFunction = useCallback(() =>
  {
    
    sendRequest(quotesId);
  }, [sendRequest, quotesId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  }

  if (status === "completed" && !loadedComments && loadedComments.length < 0) {
    comments = <p className="centered">No comments were added yet</p>;
  }
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quotesId={quotesId}
          onAddedComment={commentHandlerFunction}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
