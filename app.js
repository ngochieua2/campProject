const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const expressError = require('./errorHandler/expressError');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//Routes
const userRoutes = require('./routes/User');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

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

// express session
const sessionConfigurationObject = {
    secret: 'thisismysecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 *60 *60 *24 *7, // milisecond *second *minute *hour *day
        maxAge: 1000 *60 *60 *24 *7,
    }
}
app.use(session(sessionConfigurationObject));

//Set up passport
app.use(passport.initialize());
app.use(passport.session()); // must after app.use(session()...)
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//create a account by hard code // run once
app.get('/oneUser', async(req, res) => {
    const user = new User ({email: 'hieune@gmail.com', username: 'hieune'});
    const newUser = await User.register(user, 'hieune');
    res.send(newUser);
})

//set up connect-flash
app.use(flash());
app.use((req, res , next) => {
    // res.locals.something is create global variable and can access in anywhere
    res.locals.currentUser = req.user; // store user info into currentUser variable // req.user only work when it is in after serializeUser and deserializeUser
    res.locals.success = req.flash('success'); //it will be show in layout with any router have key success
    res.locals.error = req.flash('error'); //it will be show in layout with any router have key error
    next();
})



//set up routes
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new expressError('Page Not Found', 404));
})

// middleware for all error
app.use((err, req, res, next) => {
    const {status = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(status).render('error', { err });
})

//set up port in localhost
app.listen(3000, ()=> {
    console.log('Hi, server is on port 3000');
})