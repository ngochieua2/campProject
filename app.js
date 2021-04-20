const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const app = express();

//connect with database
mongoose.connect('mongodb://localhost:27017/campusMap', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//set ejs and folder views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//set up routes
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My backyard', description: 'cheap camp'});
    await camp.save();
    res.send(camp);
})

//set up port in localhost
app.listen(3000, ()=> {
    console.log('Hi, server is on port 3000');
})