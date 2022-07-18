const express = require('express');

const config = require('./config');
const path = require('path');

const { todolistRouter } = require('./routes/todolist');
const { get404 } = require('./controllers/error');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', todolistRouter);
app.use(get404);

app.listen(config.PORT, () => {
  console.log(`Server listening...`);
});
