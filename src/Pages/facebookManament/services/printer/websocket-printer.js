export function WebSocketPrinter(options) {
  var defaults = {
    url: "ws://127.0.0.1:12212/printer",
    onConnect: function () {
    },
    onDisconnect: function () {
    },
    onUpdate: function () {
    },
  };

  var settings = Object.assign({}, defaults, options);
  var websocket;
  var connected = false;

  var onMessage = function (evt) {
    settings.onUpdate(evt.data);
  };

  var onConnect = function () {
    connected = true;
    settings.onConnect();
  };

  var onDisconnect = function () {
    connected = false;
    settings.onDisconnect();
    reconnect();
  };

  var connect = function () {
    websocket = new WebSocket(settings.url);
    websocket.onopen = onConnect;
    websocket.onclose = onDisconnect;
    websocket.onmessage = onMessage;
  };

  var reconnect = function () {
    connect();
  };

  this.submit = function (data) {
      if (+websocket.readyState == 1) {
        websocket.send(JSON.stringify(data))
      } else {
        // Queue a retry
        setTimeout(() => { this.submit(data) }, 1000)
      }
  };

  this.isConnected = function () {
    return connected;
  };

  connect();
}