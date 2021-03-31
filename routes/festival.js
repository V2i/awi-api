const express = require('express');
const router = express.Router();
const moment = require('moment');

const Festival = require('../models/Festival');
const admin = require('../middlewares/admin');

/* GET festival listing */
router.get('/list', async (req, res) => {

    try {
        const festivals = await Festival.find()
            .populate('festivalSpace');
        return res.status(200).json(festivals);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET current festival */
router.get('/current', async (req, res) => {

    try {
        const festival = await Festival.findOne({isCurrent: true})
            .populate('festivalSpace');
        return res.status(200).json(festival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET festival by id */
router.get('/:id', async (req, res) => {

    try {
        const festival = await Festival.findById(req.params.id)
            .populate('festivalSpace');
        return res.status(200).json(festival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new festival */
router.post('/', admin, async (req, res) => {

    const festival = new Festival({
        festivalName: req.body.festivalName,
        festivalDate: moment(req.body.festivalDate),
        festivalSpace: req.body.festivalSpace,
        isCurrent: req.body.isCurrent
    });

    try {
        const savedFestival = (await festival.save())
            .populate('festivalSpace');
        return res.status(200).json(savedFestival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  festival by id */
router.patch('/:id', admin, async (req, res) => {

    try{
        await Festival.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedFestival = await Festival.findById(req.params.id)
            .populate('festivalSpace');
        return res.status(200).json(updatedFestival);
    } catch (err) {
        return res.status(500).json({message: err.message ? err.message : err});
    }

});

/* DELETE festival by id */
router.delete('/:id', admin, async (req, res) => {

    try{
        let festival = await Festival.findById(req.params.id)
            .populate('festivalSpace');

        if(!festival){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Festival.deleteOne(festival);
        return res.status(200).json(festival);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;