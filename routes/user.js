const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/User');
const admin = require('../middlewares/admin');
const user = require('../middlewares/user');

/* GET users listing */
router.get('/list', async (req, res) => {

    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* GET user by id */
router.get('/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});


/* POST new user. Only admin */
router.post('/', admin, async (req, res) => {

    //checking if user already exist
    try {
        const emailExist = await User.findOne({userMail: req.body.userMail});
        if (emailExist) return res.status(400).send('Email already exists.');
    } catch (err) {
        res.status(400).send(err);
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.userPassword, salt);

    //user creation
    const newUser = new User({
        userMail: req.body.userMail,
        userPassword: hashedPassword,
        isAdmin: req.body.isAdmin,
    });

    //posting to db
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err);
    }

});

/* PATCH  user by id */
router.patch('/:id', async (req, res) => {

    try{
        await User.updateOne({_id: req.params.id}, {$set: {...req.body}})
        const updatedUser = await User.findById(req.params.id);
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

/* DELETE user by id */
router.delete('/:id', async (req, res) => {

    try{
        let user = await User.findById(req.params.id);

        if(!user){
            return res.status(403).json({message: "Object Not Found"}).end()
        }
        await User.remove(user);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({message: err});
    }

});

module.exports = router;