const db = require("../db.json");
const fs=require("fs");
const find = () => {
  return new Promise((resolve, reject) => {
    resolve(db.books);
  });
};

const remove = (bookid) => {
  return new Promise((resolve, reject) => {
    const newBooks = db.books.filter((book) => book.id !== Number(bookid));
    if (newBooks.length === db.books.length) {
      reject({ message: "Book Not Found" });
    } else {
      fs.writeFile(
        `${process.cwd()}/db.json`,
        JSON.stringify({ ...db, books: newBooks }),
        (err) => {
            if (err) {
              reject(err);
            }
  
            resolve({ message: "Book Removed Successfully" });
          }
      );
    }
  });
};

module.exports = {
  find,
  remove,
};
