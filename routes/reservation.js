const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');
const admin = require('../middlewares/admin');
const user = require('../middlewares/user');

/* GET reservations listing */
router.get('/list', user, async (req, res) => {

    try {
        const reservations = await Reservation.find()
            .populate('reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling');
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservations listing by festival id*/
router.get('/list/festival/:id', user, async (req, res) => {

    try {
        const reservations = await Reservation.find({reservationFestival: req.params.id})
            .populate({
                path: 'reservationExhibitor reservationReservedSpace reservationTracking reservationReservedGame reservationBilling',
                populate: {
                    path: 'exhibitorEditor exhibitorContact reservedGame reservedSpace reservedGameZone',
                }
            })
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservation by id */
router.get('/:id', user, async (req, res) => {

    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling');
        return res.status(200).json(reservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new reservation */
router.post('/', admin, async (req, res) => {

    const reservation = new Reservation({
        reservationExhibitor: req.body.reservationExhibitor,
        reservationReservedSpace: req.body.reservationReservedSpace,
        reservationFestival: req.body.reservationFestival,
        reservationTracking: req.body.reservationTracking,
        reservationComment: req.body.reservationComment,
        reservationReservedGame: req.body.reservationReservedGame,
        reservationBilling: req.body.reservationBilling,
        exhibitorVolunteerNeeded: req.body.exhibitorVolunteerNeeded,
        exhibitorIsMoving: req.body.exhibitorIsMoving,
    });

    try {
        const savedReservation = await reservation.save()
            .populate('reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling');
        return res.status(200).json(savedReservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  reservation by id */
router.patch('/:id', admin, async (req, res) => {

    try{
        await Reservation.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedReservation = await Reservation.findById(req.params.id)
            .populate('reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling');
        return res.status(200).json(updatedReservation);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE reservation by id */
router.delete('/:id', admin, async (req, res) => {

    try{
        let reservation = await Reservation.findById(req.params.id)
            .populate('reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling');

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