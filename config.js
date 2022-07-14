const { join } = require('path');
module.exports = {
  PORT: 3000,
  HOST_NAME: '127.0.0.1',
  FILE_DATA: join(__dirname, '../data/todo-list.json'),
};
