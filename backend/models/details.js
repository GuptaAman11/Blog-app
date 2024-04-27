const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required:true
    }
    // birthdate:{
    //     type: Date,
    //     required:true
    // }
})

module.exports = mongoose.model('Details',DetailsSchema)