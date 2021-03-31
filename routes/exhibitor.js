const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');
const Exhibitor = require('../models/Exhibitor');
const admin = require('../middlewares/admin');

/* GET exhibitors listing */
router.get('/list', admin, async (req, res) => {

    try {
        const exhibitors = await Exhibitor.find()
            .populate('exhibitorEditor')
            .populate('exhibitorContact');
        return res.status(200).json(exhibitors);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET exhibitors listing by festival id*/
router.get('/list/festival/:id', admin, async (req, res) => {

    try {
        await Reservation.find({reservationFestival: req.params.id},{reservationExhibitor: 1})
            .populate({
                path: 'reservationExhibitor',
                populate: {
                    path: 'exhibitorContact exhibitorEditor'
                }
            }).then(
                reservationExhibitors => {
                    const exhibitors = reservationExhibitors
                        .map(e => e.reservationExhibitor)
                    return res.status(200).json(exhibitors);
                },
                err => res.status(500).json({message: err})
            );

    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET exhibitor by id */
router.get('/:id', admin, async (req, res) => {

    try {
        const exhibitor = await Exhibitor.findById(req.params.id)
            .populate('exhibitorEditor')
            .populate('exhibitorContact');
        return res.status(200).json(exhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new exhibitor */
router.post('/', admin, async (req, res) => {

    const exhibitor = new Exhibitor({
        exhibitorEditor: req.body.exhibitorEditor,
        exhibitorName: req.body.exhibitorName,
        exhibitorContact: req.body.exhibitorContact,
    });

    try {
        const savedExhibitor = (await exhibitor.save())
            .populate('exhibitorEditor')
            .populate('exhibitorContact');
        return res.status(200).json(savedExhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  exhibitor by id */
router.patch('/:id', admin, async (req, res) => {

    try{
        await Exhibitor.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedExhibitor = await Exhibitor.findById(req.params.id)
            .populate('exhibitorEditor')
            .populate('exhibitorContact');
        return res.status(200).json(updatedExhibitor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE exhibitor by id */
router.delete('/:id', admin, async (req, res) => {

    try{
        let exhibitor = await Exhibitor.findById(req.params.id)
            .populate('exhibitorEditor')
            .populate('exhibitorContact');

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