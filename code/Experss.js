const express = require("express");
const Ex=require("express")

const app=Ex();

app.use(express.json())
require("./config/db")

const ModelUser=require("./")
const user= [
    {
      "id": 1,
      "name": "Amin Saeedi",
      "username": "01010101",
      "email": "test@gmail.com",
      "crime": 0,
      "role": "ADMIN"
    },
    {
      "id": 2,
      "name": "Qadir Yolme",
      "username": "Q_Yolme",
      "email": "test@gmail.com",
      "crime": 0,
      "role": "ADMIN"
    },
    {
      "id": 3,
      "name": "Ehsan Mmdi",
      "username": "ehs",
      "email": "test@gmail.com",
      "crime": 90000,
      "role": "ADMIN"
    },
]


app.get('/Admin/:id', (req, res) => {
    const userId = Number(req.params.id);
    console.log("s")
    if (isNaN(userId)) {
        return res.status(400).send({ error: 'Invalid user ID format' });
    }

    const U = user.find(user => user.id === userId);

    if (!U) {
        return res.status(404).send({ error: 'User not found' });
    }

    res.send(U);
});

app.put("/put",(req,res)=>{
    res.status(201).send("is req put ")
})
app.post("/post",(req,res)=>{
    console.log(req.body.username)
    res.status(200).send("is req post ")
})
app.delete("/del",(req,res)=>{
    res.status(400).send("is req del ")
})


app.listen(3120, () => {
    console.log("Server Rinning On Port 3120");
  })