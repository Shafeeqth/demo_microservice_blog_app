import { useState } from "react";
import axios from "axios";

type Props = {};

const PostCreation = (props: Props) => {
  const [title, setTitle] = useState<string>("");

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post("http://posts.com/posts/create", {
      title,
    });
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            required
            value={title}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreation;
