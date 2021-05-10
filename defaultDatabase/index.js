const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./supporting');
const Campground = require('../models/campground');

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

const randomArrayValue = (array) => array[Math.floor(Math.random() * array.length)];

const defaultDatabase = async () => {
    await Campground.deleteMany({}); // delete all data in mongodb
    // create new database 
    // using loop to create 50 locations and title, then save them to mongodb
    for (let i = 0; i < 50; i++ ){
        const random = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '608fff14fd3a27210047b76d',
            location: `${cities[random].city}, ${cities[random].state}`,
            title: `${randomArrayValue(descriptors)} ${randomArrayValue(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/ngochieua2/image/upload/v1620665221/campusMap/photo-1470246973918-29a93221c455_axz9rb.jpg',
                    filename: 'campusMap/photo-1470246973918-29a93221c455_axz9rb',
                }
            ],
            description: 'some description here',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random].longitude,
                    cities[random].latitude,
                ]
            }
        })
        await camp.save();
    }
}

//run function defaultDatabase()
defaultDatabase().then(()=> {
    mongoose.connection.close();
});