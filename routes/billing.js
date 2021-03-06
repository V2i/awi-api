const express = require('express');
const router = express.Router();
const moment = require('moment');

const Reservation = require('../models/Reservation');
const Billing = require('../models/Billing');
const user = require('../middlewares/user');
const admin = require('../middlewares/admin');

/* GET billings listing */
router.get('/list', user, async (req, res) => {

    try {
        const billings = await Billing.find();
        return res.status(200).json(billings);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET billings listing by festival id */
router.get('/list/festival/:id', user, async (req, res) => {
    
    try {
        const billings = await Reservation.find({reservationFestival: req.params.id}, {reservationBilling: 1})
            .populate('reservationBilling');
        return res.status(200).json(billings);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET billings by exhibitor id */
router.get('/list/exhibitor/:id', user, async (req, res) => {

    try {
        const billings = await Reservation.find({reservationExhibitor: req.params.id}, {reservationBilling: 1})
            .populate('reservationBilling');
        return res.status(200).json(billings);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET billing by id */
router.get('/:id', user, async (req, res) => {

    try {
        const billing = await Billing.findById(req.params.id);
        return res.status(200).json(billing);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET billing by reservation id */
router.get('/reservation/:id', user, async (req, res) => {

    try {
        const billings = await Reservation.findById(req.params.id, {reservationBilling: 1})
            .populate('reservationBilling');
        return res.status(200).json(billings);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new billing */
router.post('/', user, async (req, res) => {

    const billing = new Billing({
        billingStatus: req.body.billingStatus,
        billingAmount: req.body.billingAmount
    });

    try {
        const savedBilling = await billing.save();
        return res.status(200).json(savedBilling);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH billing by id */
router.patch('/:id', user, async (req, res) => {

    try{
        await Billing.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedBilling = await Billing.findById(req.params.id);
        return res.status(200).json(updatedBilling);
    } catch (err) {
        return res.status(500).json({message: err.message ? err.message : err});
    }

});

/* DELETE billing by id */
router.delete('/:id', user, async (req, res) => {

    try{
        let billing = await Billing.findById(req.params.id);

        if(!billing){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Billing.deleteOne(billing);
        return res.status(200).json(billing);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;