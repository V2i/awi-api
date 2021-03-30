const express = require('express');
const router = express.Router();

const GameType = require('../models/GameType');
const admin = require('../middlewares/admin');

/* GET gameTypes listing */
router.get('/list', async (req, res) => {

    try {
        const gameTypes = await GameType.find();
        return res.status(200).json(gameTypes);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET gameType by id */
router.get('/:id', async (req, res) => {

    try {
        const gameType = await GameType.findById(req.params.id);
        return res.status(200).json(gameType);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new gameType */
router.post('/', admin, async (req, res) => {

    const gameType = new GameType({
        gameTypeName: req.body.gameTypeName,
    });

    try {
        const savedGameType = await gameType.save();
        return res.status(200).json(savedGameType);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH gameType by id */
router.patch('/:id', admin, async (req, res) => {

    try{
        await GameType.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedEditor = await GameType.findById(req.params.id);
        return res.status(200).json(updatedEditor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE gameType by id */
router.delete('/:id', admin, async (req, res) => {

    try{
        let gameType = await GameType.findById(req.params.id);

        if(!gameType){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await GameType.deleteOne(gameType);
        return res.status(200).json(gameType);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;