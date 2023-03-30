const fetch = require("node-fetch");

exports.handler = async () => {
  let statusCode, data;

  try {
    data = await fetch(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
    );
    statusCode = 200;
  } catch (err) {
    data = err.message;
    statusCode = err.statusCode || 500;
  }

  return {
    statusCode,
    body: data,
  };
};
