const express = require('express')
const dotenv = require('dotenv')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
dotenv.config()
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.vyehgry.mongodb.net/test?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

const upload = multer({ storage });

module.exports = { upload };