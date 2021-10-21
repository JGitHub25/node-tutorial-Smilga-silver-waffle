class CustomErrorAPI extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = statusCode;
  }
}

const createCustomError = (msg, statusC) => {
  return new CustomErrorAPI(msg, statusC);
};

module.exports = { CustomErrorAPI, createCustomError };
