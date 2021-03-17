const express = require('express');
const router = express.Router();

const ReservedGame = require('../models/ReservedGame');

/* GET reservedGames listing */
router.get('/list', async (req, res) => {

    try {
        const reservedGames = await ReservedGame.find()
            .populate('Game')
            .populate('Zone');
        return res.status(200).json(reservedGames);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservedGame by id */
router.get('/:id', async (req, res) => {

    try {
        const reservedGame = await ReservedGame.findById(req.params.id)
            .populate('Game')
            .populate('Zone');
        return res.status(200).json(reservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new reservedGame */
router.post('/', async (req, res) => {

    const reservedGame = new ReservedGame({
        reservedGame: req.body.reservedGame,
        reservedGameZone: req.body.reservedGameZone,
        reservedGameAP: req.body.reservedGameAP,
        isPlaced: req.body.isPlaced,
        isReceived: req.body.isReceived,
        hasAnimator: req.body.hasAnimator,
        reservedGameQuantity: req.body.reservedGameQuantity
    });

    try {
        const savedReservedGame = await reservedGame.save();
        return res.status(200).json(savedReservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH reservedGame by id */
router.patch('/:id', async (req, res) => {

    try{
        await ReservedGame.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedReservedGame = await ReservedGame.findById(req.params.id)
            .populate('Game')
            .populate('Zone');
        return res.status(200).json(updatedReservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE reservedGame by id */
router.delete('/:id', async (req, res) => {

    try{
        let reservedGame = await ReservedGame.findById(req.params.id)
            .populate('Game')
            .populate('Zone');

        if(!reservedGame){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await ReservedGame.deleteOne(reservedGame);
        return res.status(200).json(reservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;