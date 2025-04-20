const express = require('express')
const wrapAsync = require('../utils/wrapAsync.js')

const Listing = require('../models/listing.js')
const { isLoggedIn,isOwner, validateListing } = require('../middleware.js')
const router = express.Router()
const listingController = require('../controllers/listings.js')
const multer = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({storage})



router.route('/')
.get(wrapAsync(listingController.index)) //index route
.post(isLoggedIn,upload.single('image'),validateListing, wrapAsync(listingController.createListing)) // create route

//Add route 
router.get('/new',isLoggedIn, listingController.renderNewForm)



//Edit route 
router.get('/:id/edit',isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))


router.route('/:id')
.get(wrapAsync(listingController.showListing)) //show route
.put(isLoggedIn,isOwner, upload.single('image'),validateListing, wrapAsync(listingController.updateListing)) // Update Route 
.delete(isLoggedIn,isOwner,  wrapAsync(listingController.destroyListing)) // delete route 










module.exports = router 