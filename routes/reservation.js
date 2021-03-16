const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');
const Exhibitor = require('../models/Exhibitor');

/* GET reservations listing */
router.get('/list', async (req, res) => {

    try {
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservations listing by festival id*/
router.get('/list/festival/:id', async (req, res) => {

    try {
        const reservations = await Reservation.find({reservationFestival: req.params.id});
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservation by id */
router.get('/:id', async (req, res) => {

    try {
        const reservation = await Reservation.findById(req.params.id);
        return res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new reservation */
router.post('/', async (req, res) => {

    const reservation = new Reservation({
        reservationExhibitor: req.body.reservationExhibitor,
        reservationReservedSpace: req.body.reservationReservedSpace,
        reservationFestival: req.body.reservationFestival,
        reservationTracking: req.body.reservationTracking,
        reservationComment: req.body.reservationComment,
        reservationGame: req.body.reservationGame,
        reservationBilling: req.body.reservationBilling,
        exhibitorVolunteerNeeded: req.body.exhibitorVolunteerNeeded,
        exhibitorIsMoving: req.body.exhibitorIsMoving,
    });

    try {
        const savedReservation = await reservation.save();
        return res.status(200).json(savedReservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  reservation by id */
router.patch('/:id', async (req, res) => {

    try{
        await Reservation.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedReservation = await Reservation.findById(req.params.id);
        return res.status(200).json(updatedReservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE reservation by id */
router.delete('/:id', async (req, res) => {

    try{
        let reservation = await Reservation.findById(req.params.id);

        if(!reservation){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Reservation.deleteOne(reservation);
        return res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }



});

module.exports = router;