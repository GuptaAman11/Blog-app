const express = require('express')
const { connection } = require('./db')
const userRoutes = require('./routes/user')
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