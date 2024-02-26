const mongoose = require('mongoose');
require("dotenv/config");

module.exports = async () => {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    return mongoose;
}

