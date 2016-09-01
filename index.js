#!/usr/bin/env DEBUG=nightmare node --harmony

var Discord = require('discord.js');
const chalk = require('chalk');
var env = require('dotenv').config();
var Nightmare = require('nightmare'),
  vo = require('vo'),
  nightmare = Nightmare({show: false, openDevTools: true, dock: true});
var token = process.env.DISCORD_TOKEN;
var email = process.env.EMAIL;
var password = process.env.PASSWORD;
var bot = new Discord.Client();
var urls = [];

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
  var selector = content.substr(8);
  var channel = message.channel.name;
  if (content.startsWith('!google')) {
    vo(google)(selector, message)
  }
});

var google = function*(searchParam, message) {
  var links = []
  var result = yield nightmare
    .viewport(1280, 720)
    .useragent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36')
    .goto('https://www.google.com/#q=' + searchParam)
    .wait(2000)
    .evaluate(function() {
      return Array.from(document.querySelectorAll("h3.r a"))
        .map((element) => element.href);
    }).then(function(result) {
        return result
    })
    var link1 = result.slice(0, 1);
    var link2 = result.slice(0, 2);
    var link3 = result.slice(0, 3);
    var links = [link1 + "\n" + link2 + "\n" + link3];
    bot.reply(message, links);
}

Nightmare.action('clearCache',
  function(name, options, parent, win, renderer, done) {
    parent.respondTo('clearCache', function(done) {
      win.webContents.session.clearCache(done);
    });
    done();
  },
  function(message, done) {
    this.child.call('clearCache', done);
  });
