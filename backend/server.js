const express = require('express');
const app = express();
const cors = require("cors");
const mahFirstRoute = require('./routes/mahRoute');

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.options("*", cors());
app.use("/v1/radiohead", mahFirstRoute);

app.listen(8888, ()=> {
    console.log(`Listening on PORT`);
})