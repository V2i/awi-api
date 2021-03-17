const express = require('express');
const router = express.Router();

const ReservedSpace = require('../models/ReservedSpace');

/* GET reservedSpaces listing */
router.get('/list', async (req, res) => {

    try {
        const reservedSpaces = await ReservedSpace.find()
            .populate('reservedSpace');
        return res.status(200).json(reservedSpaces);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservedSpace by id */
router.get('/:id', async (req, res) => {

    try {
        const reservedSpace = await ReservedSpace.findById(req.params.id)
            .populate('reservedSpace');
        return res.status(200).json(reservedSpace);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new reservedSpace */
router.post('/', async (req, res) => {

    const reservedSpace = new ReservedSpace({
        reservedSpace: req.body.reservedSpace,
        reservedSpaceNbTable: req.body.reservedSpaceNbTable,
        reservedSpaceSurface: req.body.reservedSpaceSurface,
        reservedSpaceDiscount: req.body.reservedSpaceDiscount
    });

    try {
        const savedReservedSpace = await reservedSpace.save();
        return res.status(200).json(savedReservedSpace);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH reservedSpace by id*/
router.patch('/:id', async (req, res) => {

    try{
        await ReservedSpace.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedReservedSpace = await ReservedSpace.findById(req.params.id)
            .populate('reservedSpace');
        return res.status(200).json(updatedReservedSpace);
    } catch (err) {
        return res.status(500).json({message: err});
    }
});

/* DELETE reservedSpace by id */
router.delete('/:id', async (req, res) => {

    try{
        let reservedSpace = await ReservedSpace.findById(req.params.id)
            .populate('reservedSpace');

        if(!reservedSpace){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await ReservedSpace.deleteOne(reservedSpace);
        return res.status(200).json(reservedSpace);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;