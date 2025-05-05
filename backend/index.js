const express = require('express')
const { Connection } = require('./db')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const followRoutes  = require('./routes/followers')
const likeRoutes = require('./routes/like')
const aiRoutes = require('./routes/ai.routes')
const cors = require('cors')
const detailsRoutes = require('./routes/details')
const scheduleCleanupJob = require("./utils/cleanUp");


const app = express()
scheduleCleanupJob(); // Start the cleanup job
app.use(cors())



app.listen(8000, () => {
    console.log("server started")
})
app.use(express.json())
Connection();

app.use(express.static('uploads/'));
// app.use('/uploads',express.static('uploads'))


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/follow', followRoutes);
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/ai', aiRoutes)
app.use('/api/v1/comment', commentRoutes);
app.use('/api/v1/like', likeRoutes);
app.use('/api/v1/detail', detailsRoutes);


