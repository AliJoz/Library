const http = require("http");
const fs = require("fs");
const url = require("url");
const db = require("./db.json");
const { log } = require("console");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/api/users") {
    fs.readFile("db.json", (err, db) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(db);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data.users));
      res.end();
    });
  } else if (req.method === "GET" && req.url === "/api/books") {
    fs.readFile("db.json", (err, db) => {
      if (err) {
        throw err;
      }

      const data = JSON.parse(db);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(data.books));
      res.end();
    });
  } else if (req.method === "DELETE" && req.url.startsWith("/api/books")) {
    const parsedUrl = url.parse(req.url, true);
    const bookID = parsedUrl.query.id;

    const newBooks = db.books.filter((book) => book.id != bookID);

    if (newBooks.length === db.books.length) {
      res.writeHead(401, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Book Not Found" }));
      res.end();
    } else {
      fs.writeFile(
        "db.json",
        JSON.stringify({ ...db, books: newBooks }),
        (err) => {
          if (err) {
            throw err;
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.write(JSON.stringify({ message: "Book Removed Successfully" }));
          res.end();
        }
      );
    }
  } else if (req.method === "POST" && req.url === "/api/books") {
    let book = "";

    req.on("data", (data) => {
      book = book + data.toString();
    });

    req.on("end", () => {
      const newBook = { id: crypto.randomUUID(), ...JSON.parse(book), free: 1 };

      db.books.push(newBook);

      fs.writeFile("db.json", JSON.stringify(db), (err) => {
        if (err) {
          throw err;
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "New Book Added Successfully" }));
        res.end();
      });
    });
  }
  // Edite
  else if (req.method === "PUT" && req.url.startsWith("/api/books")) {
    const parseurl = url.parse(req.url, true);
    const bookId = parseurl.query.id;

    let BookNewid = "";
    req.on("data", (data) => {
      BookNewid = BookNewid + data.toString();
      console.log(BookNewid);
    });
    req.on("end", () => {
      const reqBody = JSON.parse(BookNewid);

      db.books.forEach((data) => {
        if (data.id === Number(bookId)) {
          data.title = reqBody.title;
          data.author = reqBody.author; // احتمالا باید 'author' باشد
          data.price = reqBody.price;
        }
      });
    });
    fs.writeFile("./db.json", JSON.stringify(db), (err) => {
      if (err) {
        throw err;
      } else {
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ massage: "Successfully Uppdate Books" }));
        
      }
    });
    console.log(db)
  }
});

server.listen(4000, () => {
  console.log("Server Rinning On Port 4000");
});
