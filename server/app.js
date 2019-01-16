import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import api from './utils/api';

const app = express();
const port = 3000;

app.use(logger('dev')); // 命令行里面显示请求
app.use(bodyParser.json()); // 解析json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // 解析cookie

app.use('/api', api);

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
