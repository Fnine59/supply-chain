import express from 'express';
import fs from 'fs';

const router = express.Router();
const ABSOLUTE_PATH_SERVICES = './server/services';
const REQUIRE_PATH_SERVICES = '../services/';

router.options('*', (req, res, next) => {
  next();
});

try {
  const list = fs.readdirSync(ABSOLUTE_PATH_SERVICES);
  list.forEach((item) => {
    const service = require(REQUIRE_PATH_SERVICES + item);
    if (service.init) {
      service.init(router);
    }
  });
} catch (e) {
  console.log('api配置错误', e);
}

module.exports = router;
