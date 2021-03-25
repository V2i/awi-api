const express = require('express');
const router = express.Router();

const Zone = require('../models/Zone');
const Reservation = require('../models/Reservation');

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

/* GET zones and games listing by festival id */
router.get('/list/festival/:id', async (req, res) => {
    console.log("id = " + req.params.id);
    try {
        await Reservation.find({reservationFestival: req.params.id, 'reservationReservedGame.0': {$ne: null}}, {reservationReservedGame: 1})
            .populate({
                path: 'reservationReservedGame',
                populate: {
                    path: 'reservedGame reservedGameZone',
                    populate: {
                        path : 'gameEditor gameType'
                    }
                }
            }).then(
            reservedGames => {
                console.log("ok populate");
                const zonesMapped = [];
                reservedGames
                    .forEach(r => r.reservationReservedGame
                        .forEach(g => {
                            if (!zonesMapped.find(game => game.zone._id == g.reservedGameZone._id)){
                                zonesMapped.push({
                                    zone : g.reservedGameZone,
                                    gameList : [g]
                                })
                                
                            }
                            if (zonesMapped.find(game => game.zone._id == g.reservedGameZone._id) && !zonesMapped.some(z => z.gameList.find(game => game._id == g.reservedGame._id))){
                                zonesMapped = zonesMapped.map(zone => {
                                    if (zone.zone._id == g.reservedGameZone._id){
                                        zone.gameList = [...zone.gameList, g]
                                    }
                                    return zone
                                })
                            }
                            console.log("ok")
                        })
                    )
                
                return res.status(200).json(zonesMapped);
            },
        err => res.status(500).json({message: err}));
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;
