const express = require('express');
const {randomBytes} = require('node:crypto');
const commentsByPostId = require('./data.db');
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(cors());


app.get("/posts/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
    
});

app.post("/posts/:id/comments", (req, res) => { 
    const commentId = randomBytes(4).toString("hex");
    const {content}  = req.body;
    
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;
    res.status(201).json({comments})

});


app.listen(4001, () => console.log("server linsten to http://localhost:"+4001))