const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });
const { DATABASE, DATABASE_PASSWORD } = process.env;

const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);
mongoose.connect(
    DB,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    },
    err => (err ? console.log(err.message) : console.log('mongo is on'))
);

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('data is up');
    } catch (err) {
        console.log(err.message);
    }
    process.exit();
};

const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('data is deleted');
    } catch (err) {
        console.log(err.message);
    }
    process.exit();
};

if (process.argv[2] === '--import') importData();
else if (process.argv[2] === '--delete') deleteData();
