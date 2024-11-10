import axios from "axios";
import React, { useEffect, useState } from "react";

interface Comment {
  id: string;
  content: string;
}

type Props = {
  postId: string;
};

const CommentList = ({ postId }: Props) => {
  const [comments, setComments] = useState<[] | Comment[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };
  const renderedComments = comments.map((comment) => {
    console.log(comment)
    return <li key={comment.id}>{comment.content}hello</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
