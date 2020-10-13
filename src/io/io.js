module.exports = function (socket, app, express, io, ENVIRONMENT) {
  (async () => {
    for await (let { socket } of io.listener("disconnection")) {
      console.log("IO: disconnected");
    }
  })();
  (async () => {
    for await (let { socket } of io.listener("connection")) {
    }
  })();
  (async () => {
    for await (let { socket, authToken } of io.listener("authentication")) {
    }
  })();
};
