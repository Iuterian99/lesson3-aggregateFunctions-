const express = require('express');
const app = express();


app.get("/", (req, res) =>{
  res.send("ok")
})

app.listen(9000, console.log(9000))