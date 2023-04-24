const mongoose = require('mongoose');
const errorHandler = require('../middleware/errorHandler');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        errorHandler(err);
    }
}

module.exports = connectDB;