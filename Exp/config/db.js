const mongoose = require('mongoose');


  mongoose.connect('mongodb://localhost:27017/Libarary')
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((err) => {
      console.error("Database connection error", err);
    });
  