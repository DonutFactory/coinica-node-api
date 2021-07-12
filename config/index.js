exports.allowedOrigins = (origin) => {
  if (origin === "*") {
    return origin;
  }
  return [
    /151.106.113.207:[0-9]{1,4}/, //between 1 to 4 ports
    /37.44.244.221:[0-9]{1,4}/,
    /127.0.0.1:[0-9]{1,4}/,
    /localhost:[0-9]{1,4}/,
  ];
};
