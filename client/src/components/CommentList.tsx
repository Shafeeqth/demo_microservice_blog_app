export interface Comment {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected";
}

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  console.log(comments);
  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    } else if (comment.status === "pending") {
      content = "This comment is awaiting mederation";
    } else if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
