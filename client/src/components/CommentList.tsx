export interface Comment {
  id: string;
  content: string;
}

type Props = {
  comments: Comment[];
};

const CommentList = ({ comments }: Props) => {
  console.log(comments);
  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
