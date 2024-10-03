const url = require("url");
const BookAll = require("../Model/Book");
const getAll = async (req, res) => {
  const book = await BookAll.find();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(book));
  res.end();
};
const removeBook = async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const bookID = parsedUrl.query.id;
  const book = await BookAll.remove(bookID);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.write(JSON.stringify(book));
  res.end();
}
module.exports = { getAll,removeBook };
