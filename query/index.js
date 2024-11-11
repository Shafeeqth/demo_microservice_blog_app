const express = require('express');
const cors = require('cors');

const app = express();
const posts = require('./post.db');

app.use(cors());
app.use(express.json());


app.get('/posts', (req, res) => {
    res.send(posts);

});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = {
            id,
            title,
            comments: []
        }
    } else if (type === 'CommentCreated') {
        const { id, content, postId } = data;
        posts[postId].comments.push({ id, content });
    }
    console.log(posts);

    res.send({});

});

app.listen(4002, () => {
    console.log("Listening on 4002");
})