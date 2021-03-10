const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

router.post('/login', async (req, res) => {

  await res.status(200).send('respond with a resource');

});

module.exports = router;
