const express = require('express');
const router = express.Router();

const Space = require('../models/Space');


/* GET spaces listing */
router.get('/space', async (req, res) => {

    try {
        const spaces = await Space.find();
        return res.status(200).json(spaces);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* POST new space */
router.post('/space', async (req, res) => {



});

/* PATCH new space */
router.patch('/space/:id', async (req, res) => {

    await res.status(200).send('respond with a resource');

});

module.exports = router;
