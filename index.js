var Discord = require("discord.js");
var env = require('dotenv').config();
var token = process.env.DISCORD_TOKEN;
var email = process.env.EMAIL;
var password = process.env.PASSWORD;
var bot = new Discord.Client();

bot.login(email, password).then(success).catch(err);

function success() {
    console.dir('Logged in')
}

function err(error) {
    console.dir(error)
}

bot.on('message', function(message) {
  if (message.channel.isPrivate) {
    console.dir('Private Message ' + 'from' + ' ' + message.author.name + ' : ' + message.content)
  } else {
    console.dir('Message ' + 'in' + ' ' + message.channel.name + ' from ' + message.author.name + ' : ' + message.content)
  }
});
