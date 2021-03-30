const express = require('express');
const router = express.Router();
const moment = require('moment');

const Tracking = require('../models/Tracking');
const user = require('../middlewares/user');
const admin = require('../middlewares/admin');

/* GET trackings listing */
router.get('/list', user, async (req, res) => {

    try {
        const trackings = await Tracking.find();
        return res.status(200).json(trackings);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET tracking by id */
router.get('/:id', user, async (req, res) => {

    try {
        const tracking = await Tracking.findById(req.params.id);
        return res.status(200).json(tracking);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new tracking */
router.post('/', admin, async (req, res) => {

    const tracking = new Tracking({
        trackingWorkflow: req.body.trackingWorkflow,
        trackingContact1: moment(req.body.trackingContact1),
        trackingContact2: moment(req.body.trackingContact2),
        trackingCR: req.body.trackingCR //todo: may be useless
    });

    try {
        const savedTracking = (await tracking.save());
        return res.status(200).json(savedTracking);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH tracking by id*/
router.patch('/:id', admin, async (req, res) => {

    try{
        await Tracking.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedTracking = await Tracking.findById(req.params.id);
        return res.status(200).json(updatedTracking);
    } catch (err) {
        return res.status(500).json({message: err.message ? err.message : err});
    }
});

/* DELETE tracking by id */
router.delete('/:id', admin, async (req, res) => {

    try{
        let tracking = await Tracking.findById(req.params.id);

        if(!tracking){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Tracking.deleteOne(tracking);
        return res.status(200).json(tracking);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;