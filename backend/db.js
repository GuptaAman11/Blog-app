const mongoose = require('mongoose')

const url = 'mongodb+srv://amangupta9579:aman@cluster0.vyehgry.mongodb.net/test?retryWrites=true&w=majority'

const connection = () => {
    mongoose.connect(url).then(() => {
        console.log("concttioned!!!")
    })
}

module.exports = {
    connection
}