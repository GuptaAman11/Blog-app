const express = require('express')
const { connection } = require('./db')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const likeRoutes = require('./routes/like')

const app = express()



app.listen(8000, () => {
    console.log("server started")
})
app.use(express.json())
connection();
app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);
<<<<<<< HEAD
app.use('/api/v1/like', likeRoutes);
=======

//category routes
const category_route = require("./routes/categoryRoutes");
app.use('/api',category_route);

>>>>>>> dc351506e8923c663a80111dcdf48fc8c14764b8
