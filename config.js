const { join } = require('path');
module.exports = {
  PORT: process.env.PORT || 3000,
  FILE_DATA: join(__dirname, './data/todolist.json'),
};
