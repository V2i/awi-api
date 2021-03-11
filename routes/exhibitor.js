const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');
const Exhibitor = require('../models/Exhibitor');

/* GET exhibitors listing */
router.get('/list', async (req, res) => {

    try {
        const exhibitors = await Exhibitor.find();
        return res.status(200).json(exhibitors);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET exhibitors listing by festival id*/
router.get('/list/festival/:id', async (req, res) => {

    //TODO: a tester

    try {
        const test = await Reservation.find({reservationFestival: req.params.id},{reservationExhibitor: 1});
        console.log(test);
        return res.status(200).json(test);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET exhibitor by id */
router.get('/:id', async (req, res) => {

    try {
        const exhibitor = await Exhibitor.findById(req.params.id);
        return res.status(200).json(exhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new exhibitor */
router.post('/', async (req, res) => {

    const exhibitor = new Exhibitor({
        exhibitorEditor: req.body.exhibitorEditor,
        exhibitorName: req.body.exhibitorName,
        exhibitorContact: req.body.exhibitorContact,
    });

    try {
        const savedExhibitor = await exhibitor.save();
        return res.status(200).json(savedExhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  exhibitor by id */
router.patch('/:id', async (req, res) => {

    try{
        await Exhibitor.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedExhibitor = await Exhibitor.findById(req.params.id);
        return res.status(200).json(updatedExhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE exhibitor by id */
router.delete('/:id', async (req, res) => {

    try{
        let exhibitor = await Exhibitor.findById(req.params.id);

        if(!exhibitor){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Exhibitor.deleteOne(exhibitor);
        return res.status(200).json(exhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }



});

module.exports = router;