var http = require('http');

var server = http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type' : 'text/plain' });
  res.end('Ok\n');
});
server.listen(80, 'meightbot.herokuapp.com');
console.log('Server running at https://meightbot.herokuapp.com:80');

/*var telegram = require('node-telegram-bot-api');
var express = require('express');
var bodyParser = require('body-parser');
var packageInfo = require('./package.json');
 
var token = '256982370:AAHZZm74ZJa1Evz8AvpLeRzChhWj9b0g8Jg';
var baseurl = 'https://meightbot.herokuapp.com';
var botOptions = { webHook : { host : baseurl, port : 80 } };

var bot = new telegram(token, botOptions);
bot.setWebHook(baseurl + '/' + token);

var predictionsRu = [
  'Это бесспорно',
  'Это предрешено',
  'Никаких сомнений',
  'Определенно да',
  'Можешь положиться на это',
  'Мне кажется, что да',
  'Вероятнее всего',
  'Перспективы хороши',
  'Знаки говорят — да',
  'Да',
  'Пока не ясно, попробуй снова',
  'Спроси позже',
  'Лучше не рассказывать об этом сейчас',
  'Сейчас не могу сказать',
  'Сконцентрируйся и спроси еще раз',
  'Даже не думай',
  'Мой ответ — нет',
  'По моим данным — нет',
  'Перспективы не очень хороши',
  'Весьма сомнительно'
];

function prediction() {
  return predictionsRu[Math.floor(Math.random() * predictionsRu.length)];
}
 
bot.getMe().then(function(me) {
    console.log('Hello! My name is %s!', me.first_name);
    console.log('My id is %s.', me.id);
    console.log('And my username is @%s.', me.username);
});
 
bot.on('text', function(msg) {  
  var text = msg.text;
  var lastChar = text.charAt(text.length - 1);  
  if(text.charAt(text.length - 1) !== '?') return;
  var accost = text.substring(0, 5);
  if(accost !== 'Шарик' && accost !== 'шарик') return;
  var messageOptions = { parse_mode: 'Markdown' };
  bot.sendMessage(msg.chat.id, text + '\n*' + prediction() + '*', messageOptions);  
});

function article(text) {
  return {
    type : 'article',
    id: '0',
    title: 'Твой вопрос',
    description: text + '?',
    input_message_content: {
      message_text: text + '?\n*' + prediction() + '*',
      parse_mode: 'Markdown'
    }
  };
}

bot.on('inline_query', function(inlineQuery) {
  bot.answerInlineQuery(inlineQuery.id, [article(inlineQuery.query)]);
});
*/

/*var app = express();
app.use(bodyParser.json());

var favicon = new Buffer('AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA/4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEREQAAAAAAEAAAEAAAAAEAAAABAAAAEAAAAAAQAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wAA//8AAP//AAD8HwAA++8AAPf3AADv+wAA7/sAAP//AAD//wAA+98AAP//AAD//wAA//8AAP//AAD//wAA', 'base64'); 
app.get("/favicon.ico", function(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Length', favicon.length);
  res.setHeader('Content-Type', 'image/x-icon');
  res.setHeader("Cache-Control", "public, max-age=2592000");                // expiers after a month
  res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  res.end(favicon);
 });

app.get('/', function(req, res) {
  res.json({ version: packageInfo.version });
});

app.post('/' + token, function(req, res) {
  console.log(req.originalUrl);
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

var port = process.env.PORT || 5000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Web server started at https://%s:%s', host, port);
});*/
