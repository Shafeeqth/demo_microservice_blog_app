const express = require('express');
const {randomBytes} = require("crypto");
const cors = require('cors')

// Import post data
// - in memory - data may loss for refreshs
const posts = require('./post.data');


const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
    res.send(posts)


});

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString("hex");
    const {title} = req.body;

    posts[id] = {
        id: id,
        title: title
    }
    res.status(201).send(posts[id]);

});

app.listen(4000, () => {
    console.log("Listening on http://localhost:4000");
})