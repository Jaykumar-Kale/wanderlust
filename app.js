const expree  = require('express');
const app = expree();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');

const MONGO_URL = 'mongodb://localhost:27017/wanderlust';

main()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));    

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
    res.send('Hi, I Am Root!!!');
});

app.get("/testListing", async (req,res)=>{
    const sampleListing = new Listing({
        title: "Cozy Cottage",
        description: "A cozy cottage in the countryside.",
        image: "",
        price: 150,
        location: "Countryside",
        country: "Wonderland"
    });
    await sampleListing.save();
    console.log("Sample listing saved:", sampleListing);
    res.send("Sample listing created and saved to the database.");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 