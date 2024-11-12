const express = require('express');
const axios = require('axios');


const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
    const event = req.body;
    try {
        await axios.post("http://localhost:4000/events", event);
        await axios.post("http://localhost:4001/events", event);
        await axios.post("http://localhost:4002/events", event);
        await axios.post("http://localhost:4003/events", event);
    } catch (error) {
        console.error(error)

    }

    return res.status(200).send({ status: "OK" });
});

app.listen(4005, () => console.log("listening at 4005"))