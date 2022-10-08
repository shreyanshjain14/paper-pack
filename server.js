// 모듈 dependencies  
import app from "./app";
import http from "http";

// 포트 번호 세팅
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// http 모듈에 express 모듈을 연결한다
const server = http.createServer(app);

// 서버 대기 상태
server.listen(port);
server.on('error', onError); // error에 대한 eventHandler 지정
server.on('listening', onListening); // listen에 대한 eventHandler 지정

// 포트 번호 정규화
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// error 이벤트에 대한 이벤트 리스너
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// listen 이벤트에 대한 이벤트 리스너
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
