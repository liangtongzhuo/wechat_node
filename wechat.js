'use strict';
const {Wechaty, Friendship} = require ('wechaty');
let bot;
async function iniWechat () {
  return new Promise (async function (resolve, reject) {
    if (bot && bot.logonoff()) await bot.logout();
    if (bot) {
      await bot.stop();
      bot = null;
    }
    bot = new Wechaty ();
		function onScan (qrcode, status) {
      const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent (qrcode),
      ].join ('');
      resolve (qrcodeImageUrl);
    }
		function onLogin (user) {
      console.log (`${user}onLogin`);
    }

		function onLogout (user) {
      console.log (`${user} onLogout`);
    }

		async function onMessage (msg) {
      console.log (msg, 'onMessage');
    }

		async function onFriendShip (friendship) {
      console.log (friendship, 'onFriendShip');
    }

    async function onReady (onReady){
      console.log (onReady, 'onReady');
    }

    bot.on ('scan', onScan);
    bot.on ('login', onLogin);
    bot.on ('logout', onLogout);
    bot.on ('message', onMessage);
    bot.on ('friendship', onFriendShip);
    bot.on ('ready', onReady);

    bot.start ().then (() => console.log ('start login wechat')).catch (e => reject (e));
  });
}

module.exports.iniWechat = iniWechat;
