const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const expressError = require('./errorHandler/expressError');

//Routes
const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

const app = express();

//connect with database
mongoose.connect('mongodb://localhost:27017/campusMap', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});
mongoose.set('useFindAndModify', false);

//set ejsMate, ejs and folder views
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true})); // use req.body for post req...
app.use(methodOverride('_method')); // set up method override for put and delete method in form
app.use(express.static(path.join(__dirname, 'public'))); // access folder public and can read script function inside from layout

//set up routes
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {status = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(status).render('error', { err });
})

//set up port in localhost
app.listen(3000, ()=> {
    console.log('Hi, server is on port 3000');
})