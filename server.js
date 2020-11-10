'use strict';
'use esversion:6';
const app = require('express')();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 8000;

app.get(`/`, (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

http.listen(PORT, () => {
  console.log(process.env);
  console.log(`listening on *:${PORT}`);
});
