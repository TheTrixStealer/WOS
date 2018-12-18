const Discord = require('discord.js');
const PastebinAPI = require("pastebin-js");
// Create an instance of a Discord client
const client = new Discord.Client();
const pastebin = new PastebinAPI();

var prefix = '$';

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

async function spin(invokeMessage) {
  const list = JSON.parse(pastebin.getPaste(process.env.SHIP_LIST_URL));
  var spins = 100;
  var p1 = null;
  var p2 = null;
  var msg = invokeMessage.reply(" ");
  while(spins > 0 && p1 != p2) {
    await sleep(150);
    p1 = list[Math.floor(Math.random() * list.length)];
    p2 = list[Math.floor(Math.random() * list.length)];
    msg.edit(p1 + " X " + p2);
    spins -= 1;
  }
  invokeMessage.reply(msg.edit);
  msg.delete();
}

// Create an event listener for messages
client.on('message', message => {
  if(message.content.charAt(0) == prefix) {
    if(message.content.substring(1, 5) == "ship") {
      spin(message);
    }
  }  
});


client.login(process.env.BOT_TOKEN);
