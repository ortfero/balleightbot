var Telegram = require('node-telegram-bot-api');
var CircularBuffer = require('circular-buffer');
var Files = require('fs');

console.log('Starting @meightbot...');

var token = '256982370:AAHZZm74ZJa1Evz8AvpLeRzChhWj9b0g8Jg'; 
var botOptions = { webHook : { host : '0.0.0.0', port : process.env.PORT } };
var bot = new Telegram(token, botOptions);
var baseurl = 'https://meightbot.herokuapp.com';
var webHook = baseurl + '/' + token;
var historyLength = 100;
var historySaveInterval = 60000; // every minute

console.log('Web hook at ', webHook);
bot.setWebHook(webHook);

var predictionsRu = [
  'Безусловно',
  'Абсолютно точно',
  'Никаких сомнений',
  'Определенно да',
  'Можешь положиться на это',
  'Мне кажется да',
  'Скорее всего',
  'Перспективы неплохи',
  'Знаки говорят да',
  'Да',  
  'Пока не ясно, попробуй снова',
  'Спроси позже',
  'Не хочу об этом сейчас',
  'Сейчас не могу сказать',
  'Подумай и спроси снова',
  'Даже не думай',
  'Мой ответ: нет',
  'По моим данным нет',
  'Перспективы не очень хороши',
  'Очень сомневаюсь'
];

var history = new CircularBuffer(historyLength);
Files.readFile('history.txt', (err, data) => {
  if(err)
    return console.log('Unable to read history');
  var lines = data.toString().split('\n');
  var n = lines.length;
  for(var i = 0; i < n; i++)
    history.enq(lines[i]);
  console.log('History was restored');
});
setInterval(function() {
  var array = history.toarray();
  var text = array.join('\n');
  if(text.length === 0)
    return;
  Files.writeFile("history.txt", text, function(err) {
    if(err) return console.log('Unable to save history');
  }
}, historySaveInterval);

function prediction() {
  return predictionsRu[Math.floor(Math.random() * predictionsRu.length)];
}

bot.getMe().then(function(me) {
  console.log('@%s is started.', me.username);
});
 
bot.on('text', function(msg) {
  var text = msg.text;
  if(text === '/magicballhistory')
    return showHistory(msg.chat.id);
  var lastChar = text.charAt(text.length - 1);
  if(lastChar !== '?') return;
  var accost = text.substring(0, 5);
  if(accost !== 'Шарик' && accost !== 'шарик') return;
  history.enq(formatMessage(msg));
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

function showHistory(chatId) {
  var array = history.toarray();
  var text = array.join('\n');
  if(text.length === 0)
    bot.sendMessage(chatId, "No history yet");
  bot.sendMessage(chatId, text);
}

function formatMessage(msg) {
  var date = new Date(msg.date * 1000);
  var name = !!msg.from.username ? msg.from.username : msg.from.first_name + ' ' + msg.from.last_name;
  return '[' + date.toUTCString() + '] @' + msg.from.username + ' : ' + msg.text;
}