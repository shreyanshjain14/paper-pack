import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import db from  "./models";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

/* 앱 설정 시작 */
const app = express();

// 뷰 엔진 지정: ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 연결
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공

// DB 연결 및 예제 테이블 생성
db.sequelize.sync().then(() => {
  console.log("DB Connection Success")
}).catch((error) => {
  console.log(`DB Connection Error: ${error}`);
})

// 라우터 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 등록되지 않은 라우터로 접근 시 catch
app.use(function(req, res, next) {
  next(createError(404)); // 에러 생성 후 아래의 에러 핸들러에게 넘김
});

// 에러 핸들러
app.use(function(err, req, res, next) {
  // res.locals: 요청에 대한 응답 local 변수를 포함하고 있는 객체
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500); // res.status(): 응답에 대한 HTTP status 설정
  res.render('error'); // res.render(): view를 렌더 
});

export default app;