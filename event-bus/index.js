const express = require('express');
const axios = require('axios');
const events = require('./events.db');


const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const event = req.body;
    events.push(event);
    try {
        await axios.post("http://post-clusterid-srv:4000/events", event);
        await axios.post("http://comments-srv:4001/events", event);
        await axios.post("http://query-srv:4002/events", event);
        await axios.post("http://moderation-srv:4003/events", event);
    } catch (error) {
        console.error(error)

    }

    return res.status(200).send({ status: "OK" });
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => console.log("listening at 4005"))