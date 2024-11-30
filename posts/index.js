const express = require('express');
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');

// Import post data
// - in memory - data may loss for refreshs
const posts = require('./post.data');


const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
    res.send(posts)


});

app.post("/posts/create", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;

    posts[id] = {
        id: id,
        title: title
    }
    try {
        await axios.post('http://event-bus-srv:4005/events', {
            type: "PostCreated",
            data: {
                id,
                title
            }
        })
    } catch (error) {
        console.error(error);


    }
    res.status(201).json(posts[id]);

});

app.post("/events", (req, res) => {
    console.log('Event recieved', req.body.type);

    res.send({});
})

app.listen(4000, () => {
    console.log('Version 45');

    console.log("Listening on http://localhost:4000");
})