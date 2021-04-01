const express = require('express');
const router = express.Router();

const ReservedGame = require('../models/ReservedGame');
const admin = require('../middlewares/admin');

/* GET reservedGames listing */
router.get('/list', async (req, res) => {

    try {
        const reservedGames = await ReservedGame.find()
            .populate('reservedGame')
            .populate('reservedGameZone');
        return res.status(200).json(reservedGames);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET reservedGame by id */
router.get('/:id', async (req, res) => {

    try {
        const reservedGame = await ReservedGame.findById(req.params.id)
            .populate('reservedGame')
            .populate('reservedGameZone');
        return res.status(200).json(reservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new reservedGame */
router.post('/', admin, async (req, res) => {

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
        const savedReservedGame = (await reservedGame.save())
            .populate('reservedGame')
            .populate('reservedGameZone');
        return res.status(200).json(savedReservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH reservedGame by id */
router.patch('/:id', admin, async (req, res) => {

    try{
        await ReservedGame.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedReservedGame = await ReservedGame.findById(req.params.id)
            .populate('reservedGame')
            .populate('reservedGameZone');
        return res.status(200).json(updatedReservedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE reservedGame by id */
router.delete('/:id', admin, async (req, res) => {

    try{
        let reservedGame = await ReservedGame.findById(req.params.id)
            .populate('reservedGame')
            .populate('reservedGameZone');

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