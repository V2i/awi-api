const express = require('express');
const router = express.Router();

const Editor = require('../models/Editor');
const Reservation = require('../models/Reservation');

/* GET editors listing */
router.get('/list', async (req, res) => {

    try {
        const editors = await Editor.find();
        return res.status(200).json(editors);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET editors listing by festival id */
router.get('/list/festival/:id', async (req, res) => {

    //TODO: filter

    try {
        await Reservation.find({reservationFestival: req.params.id, 'reservationReservedGame.0': {$ne: null}}, {reservationReservedGame: 1})
            .populate({path: 'reservationReservedGame', populate: { path: 'reservedGame', populate: {path: 'gameEditor'}}}).then(
            reservedGames => {
                const editors = reservedGames
                    .map(r => r.reservationReservedGame
                        .map(g => g.reservedGame.gameEditor))
                    .filter(e => e.length > 0)
                    .flat();
                return res.status(200).json(editors);
            },
        err => res.status(500).json({message: err}));
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET editor by id */
router.get('/:id', async (req, res) => {

    try {
        const editor = await Editor.findById(req.params.id);
        return res.status(200).json(editor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new editor */
router.post('/', async (req, res) => {

    const editor = new Editor({
        editorName: req.body.editorName,
    });

    try {
        const savedEditor = await editor.save();
        return res.status(200).json(savedEditor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* PATCH  editor by id */
router.patch('/:id', async (req, res) => {

    try{
        await Editor.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedEditor = await Editor.findById(req.params.id);
        return res.status(200).json(updatedEditor);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE editor by id */
router.delete('/:id', async (req, res) => {

    try{
        let editor = await Editor.findById(req.params.id);

        if(!editor){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await Editor.deleteOne(editor);
        return res.status(200).json(editor);
    } catch (err) {
        return res.status(500).json({message: err});
    }



});

module.exports = router;