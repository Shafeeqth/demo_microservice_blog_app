const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const posts = require('./post.db');

app.use(cors());
app.use(express.json());

const handleEvent = (type, data) => {
    if (type === "PostCreated") {
        console.log('post created Event bus');
        const { id, title } = data;
        posts[id] = {
            id,
            title,
            comments: []
        }

    } else if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });

    } else if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const comment = posts[postId].comments.find(comment => comment.id === id);

        comment.status = status;
        comment.content = content;
    }
}


app.get('/posts', (req, res) => {
    res.send(posts);

});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({});

});

app.listen(4002, async () => {
    console.log("Listening on 4002");
    try {
        const res = await axios.get('http://event-bus-srv:4005/events');
        res.data.forEach(event => {
            console.log('processing event :', event.type);
            handleEvent(event.type, event.data);
        })

    } catch (error) {
        console.log(error);

    }

})