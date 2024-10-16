const express = require("express");

const app = express();
const usermodel = require("./Model/user");
require("./config/db");

app.use(express.json());
const register=require("./validator/register")
app.post("/api/user", (req, res) => {
    let { name, phone, age } = req.body;

    
    if (!Name || !phone || !age) {
        return res.status(422).send("Please input required fields: name, phone, and age.");
    }

   
    usermodel.create({ Name, phone, age })
        .then((createdUser) => {
            res.status(201).json(createdUser);  
        })
        .catch((err) => {
            console.error(err);  
            res.status(500).send("Error creating user.");
        });
});

app.listen(3120, () => {
    console.log("Server Running On Port 3120");
});
