const mongoose = require("mongoose");
const keys = require("../config/keys");

const connectToDB = async () => {
    const connect = await mongoose.connect(
        process.env.MONGO_URI || keys.mongoURI,
        {
            dbName: process.env.DB_NAME || undefined,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );
    console.log(`MongoDB connected: ${connect.connection.host}`);
};

module.exports = connectToDB;
