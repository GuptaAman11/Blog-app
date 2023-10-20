const express = require('express')
const { Connection } = require('./db')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const likeRoutes = require('./routes/like')
const cors = require('cors')

const app = express()
app.use(cors())



app.listen(8000, () => {
    console.log("server started")
})
app.use(express.json())
Connection();
app.get('/', (req, res) => {
    res.send('hello world')
})
app.use(express.static('uploads/'));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/like', likeRoutes);
// app.use("/api/users",userRoutes)
