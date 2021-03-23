const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors')
//const logger = require('morgan');
const app = express();

/* Routes */
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const festivalRouter = require('./routes/festival');
const gameRouter = require('./routes/game');
const gameTypeRouter = require('./routes/gameType');
const reservationRouter = require('./routes/reservation');
const editorRouter = require('./routes/editor');
const exhibitorRouter = require('./routes/exhibitor');
const contactRouter = require('./routes/contact');
const spaceRouter = require('./routes/space');
const reservedGameRouter = require('./routes/reservedGame');
const zoneRouter = require('./routes/zone');
const reservedSpaceRouter = require('./routes/reservedSpace');
const trackingRouter = require('./routes/tracking');
const billingRouter = require('./routes/billing');

//require('dotenv/config');
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

/* Middlewares */
app.use(authRouter);
app.use('/user', userRouter);
app.use('/festival', festivalRouter);
app.use('/game', gameRouter);
app.use('/gameType', gameTypeRouter);
app.use('/reservation', reservationRouter);
app.use('/editor', editorRouter);
app.use('/exhibitor', exhibitorRouter);
app.use('/contact', contactRouter);
app.use('/space', spaceRouter);
app.use('/reservedGame', reservedGameRouter);
app.use('/zone', zoneRouter);
app.use('/reservedSpace', reservedSpaceRouter);
app.use('/tracking', trackingRouter);
app.use('/billing', billingRouter);

/* Default Route */
app.use((rep, res) => {
    res.status(404).json({error: "route does not exist"})
});

/* Connection to DB */
mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to DB')
);

module.exports = app;
