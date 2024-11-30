import axios from "axios";
import { useEffect, useState } from "react";
import CommentList, { Comment } from "./CommentList";
import CommentCreate from "./CommentCreate";
interface Posts {
  [id: string]: {
    id: string;
    title: string;
    comments: Comment[];
  };
}
type Props = {};

const PostList = (props: Props) => {
  const [posts, setPosts] = useState<Posts>({});

  useEffect(() => {
    async function getPosts() {
      const responst = await axios.get("http://posts.com/posts");
      setPosts(responst.data);
    }
    getPosts();
  }, []);
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
