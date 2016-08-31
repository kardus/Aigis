var Discord = require("discord.js");
var env = require('dotenv').config();
var token = process.env.DISCORD_TOKEN;
var email = process.env.EMAIL;
var password = process.env.PASSWORD;
var client = new Discord.Client();

client.loginWithToken(token, output);

function output(error, token) {
  if (error) {
    console.log('There was an error logging in: ' + error);
    return;
  } else {
      console.log('Logged in. Token: ' + token);
  }
}

client.on('message', function(message) {
  if (message.channel.isPrivate) {
    console.log('(Private) ${message.author.name}: ${message.content}');
  } else {
      console.log('(${message.server.name} / ${message.channel.name}) ${message.author.name}: ${message.content}');
  }
});
