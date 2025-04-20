const Listing = require('../models/listing')
const Review = require('../models/review')

module.exports.createReview = async (req, res, next) => {
        const listing = await Listing.findById(req.params.id); // Accessing :id
        const review = new Review(req.body.review);
        review.author = req.user._id
        listing.reviews.push(review);
        await review.save();
        await listing.save();
        req.flash('success','new review created !')
        res.redirect(`/listings/${listing._id}`);
    
}

module.exports.destroyReview = async (req,res)=>{
    let {id,reviewId} = req.params
    await Listing.findByIdAndUpdate(id, {$pull:{reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash('success','review deleted !')
    res.redirect(`/listings/${id}`)
    
}