const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

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