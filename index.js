#!/usr/bin/env DEBUG=nightmare node --harmony

var Discord = require('discord.js');
const chalk = require('chalk');
var env = require('dotenv').config();
var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({show: true, openDevTools: true});
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
  }
});

var google = function*(searchParam) {
  var search = yield nightmare
    .goto('https://www.google.com/')
    .type('form[action=*"/search"] [name=f]', searchParam)
    //switch this to an actual element
    .wait(5000)
    //wtf where is google hiding this?
    .click('div#sblsbb')
    .evaluate(function(){
      Array.from(document.querySelectorAll('h3.r'))
        .map((element) => element.href)
    }).then(function(result) {
      console.log(result)
    });
  return search
}
