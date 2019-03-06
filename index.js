'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const iniWechat = require('./wechat').iniWechat;

const app = new Koa();
app.use(bodyParser());

const router = new Router();
app.use(router.routes());

router.get('/', async function(ctx) {
  try {
    ctx.body = await iniWechat();
  } catch (error) {
    ctx.error = error;
  }
});

app.listen(config.PORT, function(err) {
  console.log('Node app is running on port:', config.PORT);

  process.on('uncaughtException', function(err) {
    console.error('Caught exception:', err.stack);
  });

  process.on('unhandledRejection', function(reason, p) {
    console.error('Unhandled Rejection at: Promise ', p, ' reason: ', reason.stack);
  });
});
