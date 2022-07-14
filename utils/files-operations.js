const { readFile, writeFile } = require('fs').promises;

const getDataFromFile = async path => {
  try {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const saveDataToFile = async (path, data) => {
  try {
    await writeFile(path, JSON.stringify(data), 'utf8');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getDataFromFile,
  saveDataToFile,
};
