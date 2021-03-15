const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function (req, res, next) {

    // Check if user has a token
    const token = req.header('auth-token');

    if (token) {

        // Check if token is valid
        try {
            const {_id/*, iat*/} = jwt.verify(token, process.env.TOKEN_SECRET);

            req.user = await User.findOne({_id})

            // Check if user is admin
            if(req.user.isAdmin === 'false') {
                req.user = null;
                return res.status(403).json({message: 'You are not admin'});
            }

        } catch (err) {
            req.user = null;
        }

    } else return res.status(401).json({message: 'You are not authenticated'});

    return next();
};