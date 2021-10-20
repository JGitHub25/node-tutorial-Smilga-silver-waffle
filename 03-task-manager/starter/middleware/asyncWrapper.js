const asyncWrapper = (controllerFunction) => {
  return async (req, res, next) => {
    try {
      await controllerFunction(req, res, next);
    } catch (error) {}
  };
};

module.exports = asyncWrapper;
