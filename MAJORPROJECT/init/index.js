const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js')
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'


main()
.then(()=>{
    console.log('connected to db')
})
.catch((err)=> console.log(err))

async function main(){
    await mongoose.connect(MONGO_URL)
}

const initDB = async () => {
    await Listing.deleteMany({});
  
    // Assuming initData.data contains listings with an image object, extract the URL
    const fixedData = initData.data.map(item => ({
      ...item,
      image: typeof item.image === 'object' ? item.image.url : item.image,
      owner: "67fcb8d5e1294a0eaef6dde8"
    }));
    
    await Listing.insertMany(fixedData);
    console.log('data was initialized');
  };
  
initDB();