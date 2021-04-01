const express = require('express');
const router = express.Router();

const Reservation = require('../models/Reservation');
const Exhibitor = require('../models/Exhibitor');
const ReservedSpace = require('../models/ReservedSpace');
const ReservedGame = require('../models/ReservedGame');
const Festival = require('../models/Festival');
const Tracking = require('../models/Tracking');
const Billing = require('../models/Billing');

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
                    path: 'exhibitorEditor exhibitorContact reservedGame reservedSpace reservedGameZone festivalSpace',
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
        .populate({
            path:'reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling',
            populate: {
                path: 'reservedGame reservedGameZone festivalSpace',
                populate: {
                    path : 'gameEditor gameType'
                }
            }
        });
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
        const savedReservation = (await reservation.save());
        await Exhibitor.populate(savedReservation, {path: "reservationExhibitor"});
        await ReservedSpace.populate(savedReservation, {path: "reservationReservedSpace"});
        await Festival.populate(savedReservation, {
            path: "reservationFestival",
            populate: {
                path: "festivalSpace",
                model: "Space"
            }
        });
        await Tracking.populate(savedReservation, {path: "reservationTracking"});
        await ReservedGame.populate(savedReservation, {path: "reservationReservedGame"});
        await Billing.populate(savedReservation, {path: "reservationBilling"});

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
            .populate({
                path:'reservationExhibitor reservationReservedSpace reservationFestival reservationTracking reservationReservedGame reservationBilling',
                populate: {
                    path: 'reservedGame reservedGameZone',
                    populate: {
                        path : 'gameEditor gameType'
                    }
                }
            }
                );
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