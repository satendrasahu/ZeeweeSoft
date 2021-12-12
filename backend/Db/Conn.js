const mongoose = require('mongoose')
    // mongoose.connection;
mongoose.connect("mongodb://localhost:27017/Zeeweesoft", {
        // useCreatendex: true,
        // useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`database connection is succeessfull`);
    })
    .catch((e) => {
        console.log(`No connection`)
    })