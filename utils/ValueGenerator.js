const { v4: uuidv4 } = require('uuid');

class ValueGenerator {
  static getGeneratedId() {
    return uuidv4();
  }
  static getCurrentDate() {
    return new Date().toISOString();
  }
}

module.exports = {
  ValueGenerator,
};
