const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
})

const opts = {toJSON: {virtuals: true}};

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function() {
    return `<a href="/campgrounds/${this._id}">${this.title}</a><p>${this.description.substring(0,20)}...</p>`;
})

//need to check type of middleware like findbyIdAndDelete refer to findOneAndDelete
//this query middleware is use to delete review after delete a campground
// in camp.review just has ID of all review. use populate to show more
CampgroundSchema.post('findOneAndDelete', async function (camp) {
    if(camp){
        await Review.deleteMany({
            _id: { $in: camp.reviews }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);