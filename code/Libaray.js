const fs = require("fs");
const http = require("http");

const serve = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/Api/Book") {
    fs.readFile("db.json", (err, data) => {
      if (err) {
        // در صورت بروز خطا، پاسخ خطا را ارسال کنید
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      const datas = JSON.parse(data);
      // تبدیل داده JSON به آبجکت و ارسال آن به عنوان رشته
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(datas.books));
   
      res.end();
    });
  } else {
    // پاسخ برای درخواست‌های دیگر
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

serve.listen(4201, () => {
  console.log("Server running on port 4201");
});
