// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const status = err.status || 500;

  res.status(status);

  console.log(err);

  res.send({
    status,
    message: err.message,
  });
};
