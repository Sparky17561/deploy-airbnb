const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Review = require('./review.js')

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String ,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [{  // Default set to an empty array
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
});


listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        // Check if the reviews field exists and is an array
        if (Array.isArray(listing.reviews)) {
            // Delete all reviews that are linked to this listing
            await Review.deleteMany({
                _id: { $in: listing.reviews }
            });
            console.log('Reviews deleted');
        } else {
            console.log('No reviews to delete');
        }
    }
});


const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
