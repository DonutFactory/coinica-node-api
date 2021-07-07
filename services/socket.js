exports.onMessageSocketTx = (wsConn, txType) => {
  return new Promise((resolve, reject) => {
    wsConn.addEventListener("message", function incoming(event) {
      const depositData = JSON.parse(event.data) || null;
      if (depositData.response === "success") {
        resolve({ data: 1 });
      } else {
        reject(
          new Error(
            `Failed sending ${txType.toLowerCase()} transaction details`
          )
        );
      }
    });
  });
};
