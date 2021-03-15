const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/login', async (req, res) => {

    //checking if email exists
    const user = await User.findOne({userMail: req.body.userMail});
    if (!user) return res.status(400).send('Email or password is wrong.');

    //if the passwords are matching
    const validPassword = await bcrypt.compare(req.body.userPassword, user.userPassword);
    if (!validPassword) return res.status(400).send('Email or password is wrong.');

    //creation of the jwt
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    let userInfo = await User.findById(user._id);

    res.status(200).send({userInfo, authToken: token});

});

module.exports = router;
