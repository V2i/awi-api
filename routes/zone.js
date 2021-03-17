const express = require('express');
const router = express.Router();

const Zone = require('../models/Zone');

/* GET zones listing */
router.get('/list', async (req, res) => {

    try {
        const zones = await Zone.find();
        return res.status(200).json(zones);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET zone by id */
router.get('/:id', async (req, res) => {

    try {
        const zone = await Zone.findById(req.params.id);
        return res.status(200).json(zone);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new zone */
router.post('/', async (req, res) => {

    const zone = new Zone({
        zoneName: req.body.zoneName
    });

    try {
        const savedZone = await zone.save();
        return res.status(200).json(savedZone);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH zone by id */
router.patch('/:id', async (req, res) => {

    try{
        await Zone.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedZone = await Zone.findById(req.params.id);
        return res.status(200).json(updatedZone);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE zone by id */
router.delete('/:id', async (req, res) => {

    try{
        let zone = await Zone.findById(req.params.id);

        if(!zone){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Zone.deleteOne(zone);
        return res.status(200).json(zone);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;