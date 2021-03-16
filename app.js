const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const festivalRouter = require('./routes/festival');
const gameRouter = require('./routes/game');
const reservationRouter = require('./routes/reservation');
const editorRouter = require('./routes/editor');
const exhibitorRouter = require('./routes/exhibitor');
const spaceFestival = require('./routes/space');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(authRouter);
app.use('/user', userRouter);
app.use('/festival', festivalRouter);
app.use('/game', gameRouter);
app.use('/reservation', reservationRouter);
app.use('/editor', editorRouter);
app.use('/exhibitor', exhibitorRouter);
app.use('/space', spaceFestival);

app.use((rep, res) => {
    res.status(404).json({error: "route does not exist"})
});

require('dotenv/config');

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('Connected to DB')
);

module.exports = app;
