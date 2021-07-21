exports.allowedOrigins = (origin) => {
  if (origin === "*") {
    return origin;
  }
  return [
    /31.220.53.187:[0-9]{1,4}/, //between 1 to 4 ports
    /31.220.55.58:[0-9]{1,4}/,
    /127.0.0.1:[0-9]{1,4}/,
    /localhost:[0-9]{1,4}/,
  ];
};
