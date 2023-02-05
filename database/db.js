const mongoose = require("mongoose");
const keys = require("../config/keys");

const connectToDB = async () => {
    const connect = await mongoose.connect(keys.mongoURI, {
        // dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
};

module.exports = connectToDB;
