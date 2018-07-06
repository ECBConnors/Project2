const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/test_app';

app.get('/', (req, res) => {
  res.send('testing');
});

mongoose.connect(mongouri);
mongoose.connection.on('open', () => {
  console.log('############connected###########');
});

app.listen(port, () => {
  console.log('listening');
});
