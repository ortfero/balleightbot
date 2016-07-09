var Telegram = require('node-telegram-bot-api');

console.log('Starting @meightbot...');

var token = '256982370:AAHZZm74ZJa1Evz8AvpLeRzChhWj9b0g8Jg'; 
var botOptions = { webHook : { host : '0.0.0.0', port : process.env.PORT } };
var bot = new Telegram(token, botOptions);
var baseurl = 'https://meightbot.herokuapp.com';
var webHook = baseurl + '/' + token;
var copyChatId = 59586735;

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
  var answer = text + '\n*' + prediction() + '*';
  bot.sendMessage(msg.chat.id, answer, messageOptions);
  if(!!copyChatId && copyChatId !== msg.chat.id)
  	bot.sendMessage(copyChatId, formatMessage(msg.from, answer), messageOptions);  
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

function formatMessage(from, text) {
  var name = !!from.username ? from.username :
  	         !!from.last_name ? from.first_name + ' ' + from.last_name :
  	                            from.first_name;
  return name + ' : ' + text;
}