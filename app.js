const express = require('express');
const { engine } = require('express-handlebars');
const config = require('./config');
const path = require('path');

const { todolistRouter } = require('./routes/todolist');
const errorController = require('./controllers/error');

const app = express();
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', todolistRouter);
app.use(errorController.get404);

app.listen(config.PORT, config.HOST_NAME, () => {
  console.log(`Server listening on http://${config.HOST_NAME}:${config.PORT}`);
});
