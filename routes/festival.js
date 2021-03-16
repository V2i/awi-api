const express = require('express');
const router = express.Router();
const moment = require('moment');

const Festival = require('../models/Festival');

/* GET festival listing */
router.get('/list', async (req, res) => {

    try {
        const festivals = await Festival.find().populate('festivalSpace');
        return res.status(200).json(festivals);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET festival by id */
router.get('/:id', async (req, res) => {

    try {
        const festival = await Festival.findById(req.params.id);
        return res.status(200).json(festival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET current festival */
router.get('/current', async (req, res) => {

    try {
        const festival = await Festival.find({isCurrent: true});
        return res.status(200).json(festival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new festival */
router.post('/', async (req, res) => {

    const festival = new Festival({
        festivalName: req.body.festivalName,
        festivalDate: moment(req.body.festivalDate),
        festivalSpace: req.body.festivalSpace,
        isCurrent: req.body.isCurrent
    });

    try {
        const savedFestival = await festival.save();
        return res.status(200).json(savedFestival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  festival by id */
router.patch('/:id', async (req, res) => {

    try{
        await Festival.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedFestival = await Festival.findById(req.params.id);
        return res.status(200).json(updatedFestival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE festival by id */
router.delete('/:id', async (req, res) => {

    try{
        let festival = await Festival.findById(req.params.id);

        if(!festival){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Festival.remove(festival);
        return res.status(200).json(festival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;