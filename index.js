#!/usr/bin/env DEBUG=nightmare node --harmony

var Discord = require('discord.js');
const chalk = require('chalk');
var env = require('dotenv').config();
var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({show: true, openDevTools: true, dock: true});
var token = process.env.DISCORD_TOKEN;
var email = process.env.EMAIL;
var password = process.env.PASSWORD;
var bot = new Discord.Client();

bot.login(email, password).then(success).catch(err);

function success() {
    console.log(chalk.green('Logged In'));
}

function err(error) {
    console.log(error)
}

bot.on('message', function(message) {
  if (message.channel.isPrivate) {
    console.log(chalk.cyan('Private Message ' + 'from ') + chalk.red(message.author.name) + ' : ' + message.content)
  } else {
    console.log(chalk.bgBlack('Message ' + 'in' + ' ' + message.channel.name + ' from ') + chalk.red(message.author.name) + ' : ' + message.content)
  }
});

bot.on('message', function(message) {
  var content = message.content;
  var selector = content.substr(8)
  if (content.startsWith('!google')) {
    vo(google)(selector)
      .then(result => console.log(result))
  }
});

var google = function*(searchParam) {
  var result = yield nightmare
    .viewport(1280, 720)
    .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36')
    .goto('https://www.google.com/')
    .type('form[action=*"/search"] [name=f]', searchParam + '\u000d')
    .wait('div#rcnt')
    .extract('div.mw div#rcnt h3.r a')
    .end()
  return result
}

Nightmare.action('extract', function(selector){
  this.evaluate_now((selector) => {
    return document.querySelector(selector)
        .href;
  }, selector)
})
