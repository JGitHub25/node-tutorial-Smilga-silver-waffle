const notFound = (req, res) => {
  res.status(404).send('<h2 style="color: blue;">Route does not exist.</h2>');
};
module.exports = notFound;
