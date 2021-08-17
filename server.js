const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION');
    console.log(err);
});

const app = require('./app');
const mongoose = require('mongoose');

const { PORT, DATABASE, DATABASE_PASSWORD } = process.env;

const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);
mongoose.connect(
    DB,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    err => (err ? console.log(err.message) : console.log('mongo is on'))
);

const port = PORT || 8000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION');
    console.log(err);
    server.close(() => process.exit(1));
});


