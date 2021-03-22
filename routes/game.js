const express = require('express');
const Reservation = require('../models/Reservation');
const router = express.Router();

const Game = require('../models/Game');

/* GET game listing */
router.get('/list', async (req, res) => {

    try {
        const games = await Game.find()
            .populate('gameType')
            .populate('gameEditor');
        return res.status(200).json(games);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new game */
router.post('/', async (req, res) => {

    const { game } = req.body;
    
    const newGame = new Game({
        gameName: game.gameName,
        gameMinimumAge: game.gameMinimumAge,
        gameDuration: game.gameDuration,
        isPrototype: game.isPrototype,
        gameMinimumPlayers: game.gameMinimumPlayers,
        gameMaximumPlayers: game.gameMaximumPlayers,
        gameType: game.gameType,
        gameEditor: game.gameEditor,
        gameNotice: game.gameNotice,
    });
    
    try {
        const savedGame = await newGame.save()
            .populate('gameType')
            .populate('gameEditor');
        return res.status(200).json(savedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }
    

});

/* GET  game by id */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const game = await Game.findById({_id: id})
            .populate('gameType')
            .populate('gameEditor');
        if(!game){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        return res.status(200).json(game);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  game by id */
router.patch('/:id', async (req, res) => {

    try{
        await Game.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedGame = await Game.findById(req.params.id)
            .populate('gameType')
            .populate('gameEditor');
        return res.status(200).json(updatedGame);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE game by id */
router.delete('/:id', async (req, res) => {

    try{
        let game = await Game.findById(req.params.id)
            .populate('gameType')
            .populate('gameEditor');

        if(!game){
            return res.status(403).json({message: "Object Not Found"}).end();
        }
        await Game.deleteOne(game);
        return res.status(200).json(game);
    } catch (err) {
        return res.status(500).json({message: err});
    }
});

/* GET filter games by editor */
router.get('/list/editor/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const game = await Game.find({gameEditor: id})
            .populate('gameType')
            .populate('gameEditor');
        return res.status(200).json(game);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET games listing by festival id */
router.get('/list/festival/:id', async (req, res) => {

    //TODO: a tester

    try {
        await Reservation.find({reservationFestival: req.params.id}, (err, reservations) => {
            console.log(reservations);
            reservations.map(r => r.reservationGame)
                .flat()
            return res.status(200).json(reservations);
        });

    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;