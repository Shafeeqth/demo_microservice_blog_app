const express = require('express');
const { randomBytes } = require('node:crypto');
const commentsByPostId = require('./data.db');
const app = express();
const cors = require('cors');
const axios = require('axios');


app.use(express.json());
app.use(cors());


app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);

});

app.post("/posts/:id/comments", async (req, res) => {
    const commentId = randomBytes(4).toString("hex");
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: 'pending' });
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: "CommentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending"
        }
    });
    return res.status(201).json({ comments })

});

app.post("/events", async (req, res) => {
    const { type , data} = req.body;

    if (type === "CommentModerated") {
        const { id, postId, status, content } = data;

        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => comment.id === id);
        comment.status = status;
        
        await axios.post('http://event-bus-srv:4005/events', {
            type: "CommentUpdated",
            data: {
                id,
                content,
                status,
                postId
            }
        })
    }

   return  res.send({});
});


app.listen(4001, () => console.log("server listen to http://localhost:" + 4001))