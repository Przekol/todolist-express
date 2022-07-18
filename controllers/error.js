const get404 = (req, res) => {
  res.status(404).redirect('./404.html');
};

module.exports = {
  get404,
};
