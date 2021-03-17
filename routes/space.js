const express = require('express');
const router = express.Router();

const Space = require('../models/Space');

/* GET spaces listing */
router.get('/list', async (req, res) => {

    try {
        const spaces = await Space.find();
        return res.status(200).json(spaces);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET space by id */
router.get('/:id', async (req, res) => {

    try {
        const space = await Space.findById(req.params.id);
        return res.status(200).json(space);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new space */
router.post('/', async (req, res) => {

    const space = new Space({
        spaceName: req.body.spaceName,
        spacePriceTable: req.body.spacePriceTable,
        spacePriceSurface: req.body.spacePriceSurface,
        spaceNbTable: req.body.spaceNbTable,
        spaceSurface: req.body.spaceSurface,
    });

    try {
        const savedSpace = await space.save();
        return res.status(200).json(savedSpace);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH space by id*/
router.patch('/:id', async (req, res) => {

    try{
        await Space.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedSpace = await Space.findById(req.params.id);
        return res.status(200).json(updatedSpace);
    } catch (err) {
        return res.status(500).json({message: err});
    }
});

/* DELETE space by id */
router.delete('/:id', async (req, res) => {

    try{
        let space = await Space.findById(req.params.id);

        if(!space){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Space.deleteOne(space);
        return res.status(200).json(space);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;