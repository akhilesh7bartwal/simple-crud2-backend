const mongoose = require('mongoose');

const DB= "mongodb+srv://akhilesh007:akhilesh007@cluster0.cy0gi.mongodb.net/mernstack?retryWrites=true&w=majority";


mongoose.connect(DB,{
    useNewUrlParser: true,
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));