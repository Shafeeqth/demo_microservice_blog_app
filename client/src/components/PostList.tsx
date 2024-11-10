import axios from "axios";
import { useEffect, useState } from "react";
import CommentCreate from "./commentCreate";
import CommentList from "./CommentList";
interface Posts {
  [id: string]: {
    id: string;
    title: string;
  };
}
type Props = {};

const PostList = (props: Props) => {
  const [posts, setPosts] = useState<{} | Posts>({});

  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    const responst = await axios.get("http://localhost:4000/posts");
    setPosts(responst.data);
  };
  const renderedPosts = Object.values(posts).map((post) => {
   
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList postId={post.id} />
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
