const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('HELLO!');
})

app.listen(3003, () => console.log('Listening on 3003'));