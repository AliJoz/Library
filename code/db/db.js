const { MongoClient } = require("mongodb");
require("dotenv").config();

const dbConnection = new MongoClient(process.env.dbConnecltionUrl);
const dbName = process.env.dbName;

const main = async () => {
  await dbConnection.connect();
  console.log("Connected To DBConnection Successfully :))");

  const db = dbConnection.db(dbName);

  // * insertOne
  // const usersCollection = db.collection("users");
  // usersCollection.insertOne({
  //   name: "Qadir Yolme",
  //   username: "Q_Yolme",
  //   email: "test@gmail.com",
  //   crime: 0,
  //   role: "ADMIN",
  // });

//   * insertOne
  const booksCollection = db.collection("books");
  booksCollection.insertOne({
    title: "Nodejs Book",
    author: "Person 1",
    price: 200000,
    free: 0,
  });

//   const rentsCollection = db.collection("rents");
//   const result = await rentsCollection.insertMany([
//     { userID: 1, bookID: 1 },
//     {
//       userID: "fc9b7cd0-173c-4f5f-9bc8-ec9c062d7379",
//       bookID: 2,
//     },
//   ]);

  console.log(result);

  return "Done";
};

main();
