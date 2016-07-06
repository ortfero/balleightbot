var telegram = require('node-telegram-bot-api');
var bodyParser = require('body-parser');
var packageInfo = require('./package.json');

console.log('Starting @meightbot...');

var token = '256982370:AAHZZm74ZJa1Evz8AvpLeRzChhWj9b0g8Jg'; 
var botOptions = { webHook : { host : '0.0.0.0', port : process.env.PORT } };
var bot = new telegram(token, botOptions);
var baseurl = 'https://meightbot.herokuapp.com';
var webHook = baseurl + '/' + token;
console.log('Web hook at ', webHook);
bot.setWebHook(webHook);

var predictionsRu = [
  'Это бесспорно',
  'Это предрешено',
  'Никаких сомнений',
  'Определенно да',
  'Можешь положиться на это',
  'Мне кажется да',
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
  console.log('@%s is started.', me.username);
});
 
bot.on('text', function(msg) {
  var text = msg.text;
  var lastChar = text.charAt(text.length - 1);
  if(lastChar !== '?') return;
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
