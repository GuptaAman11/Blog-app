const Details = require('../models/details')

//for new detail
const addDetails = async (req, res) => {
    const {username,bio}=req.body;
    try {
        const savedDetails= await Details.create({
            username : username,
            bio : bio
            // birthdate : birthdate
        });
        res.status(200).json(savedDetails);
        console.log('details created')
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {addDetails}