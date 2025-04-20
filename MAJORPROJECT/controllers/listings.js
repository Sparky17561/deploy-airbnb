const Listing = require('../models/listing.js')


module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({})
    res.render('listings/index.ejs',{allListings})
    }

module.exports.renderNewForm = (req,res)=>{
    res.render('listings/new.ejs')
}

module.exports.showListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate({path: "reviews",populate:{path:"author",},}).populate('owner');
    if (!listing) {
        req.flash('error', 'Listing not found');
        res.redirect('/listings');
    }
    res.render('./listings/show.ejs', { listing });
}

module.exports.createListing = async (req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename
    const newListing = new Listing(req.body.Listing)
    newListing.owner = req.user._id
    newListing.image = {url,filename}
    await newListing.save()
    req.flash('success','new listing created !')
    res.redirect('/listings')
   
}

module.exports.renderEditForm =  async (req,res)=>{
    let {id} = req.params
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash('error', 'Listing not found');
        res.redirect('/listings');
    }
    console.log(listing)
    let originalImageUrl = listing.image.url 
    originalImageUrl = originalImageUrl.replace('/upload','/upload/w_250')
    res.render('listings/edit.ejs',{listing,originalImageUrl})
}

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.Listing });
    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename
        listing.image = {url,filename}
        await listing.save()
    }
    
    req.flash('success','listing updated !')
    res.redirect(`/listings/${id}`);

}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log(deletedListing)
    req.flash('success','listing deleted !')
    res.redirect('/listings')
}