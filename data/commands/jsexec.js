const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const moment = require("moment")
const embedfooter = moment().format('h:mm:ss a') + 'EST on ' +  moment().format('MMMM Do YYYY')
const momentdate = moment().format('MMMM Do YYYY')
const momentday = moment().format('dddd')
module.exports.run = (client, message, args, data, game, announcement) => {
  var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  const modlog = message.guild.channels.find('name', 'mod-log');
  const announcements = message.guild.channels.find('name', 'announcements')
var wronguserembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('**Owner Only Command**')
  .setDescription('*This command is exclusive to the owner of this bot*')
  .setFooter(embedfooter)
var jsexecmlerrembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('JSExec Command Used by Non-Owner')
  .setDescription(message.author.username)
  .setFooter(embedfooter)

var jsexecmlembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('JSExec Command Used by Owner')
  .setDescription(message.author.username)
  .setAuthor(message.author.username ,message.author.avatarURL)
  .setFooter(embedfooter)


if (message.author.id !== data.ownerid) {
  message.channel.send({embed: wronguserembed}).catch(console.error)
  if(modlog) {
    modlog.send({embed: jsexecmlerrembed}).catch(console.error);
  }
}
const execute = eval(message.content.split(' ').slice(1).join(' '))
const something2execute = message.content.split(' ').slice(1).join(' ')
var noevalembed = new Discord.RichEmbed()
  .setColor(data.embedcolor)
  .setTitle('JS Exec Usage')
  .setDescription("Please provide something to evaluate")
  .addField(data.prefix + 'jsexec <evaluation>','<evaluation> = Something to evaluate.')
  .setFooter(embedfooter)


if (something2execute.length < 1) return message.channel.send({embed: noevalembed}).catch(console.error);


var jsembed = new Discord.RichEmbed()
 .setColor(data.embedcolor)
 .setTitle("JS Execution")
  .addField(':inbox_tray:','**Input**')
 .addField(something2execute, '↓')
.addField(':outbox_tray:','**Output**')
.addField(execute, '∎')
.setFooter(embedfooter)
    message.channel.send({embed: jsembed}).catch(console.error);
    if(modlog) return modlog.send({embed: jsexecmlembed}).catch(console.error);
}
module.exports.help = {
  name: "jsexec",
  info: "Execute something is NodeJS",
  usage: "jsexec <execution>"
}