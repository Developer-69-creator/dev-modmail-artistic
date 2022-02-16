const Discord = require('discord.js');
const client = new Discord.Client();
const { token,thumb,modmailServerId,ticketCategoryID,modmailLogChannelId,mainServerId } = require('./config.json');
const keepAlive = require("./server");


var prefix="a.";
client.once('ready', () => {
     console.log('Ready!');
   client.user.setStatus('dnd');client.user.setPresence({activity: {name: 'Video editing / GFX',type: 'WATCHING'}}) 
}); 

let rList = {}
var userID;
 var reason;
 var ticketName;
client.on('message', message => { 
    if (message.author.bot || !(message.channel.parentID === ticketCategoryID || message.channel.type === 'dm')) return;
const serverName = client.guilds.cache.get(mainServerId).name;
console.log(serverName);

const argCmd = message.content.slice(prefix.length).trim().split(' ');
const cmd = argCmd.shift().toLowerCase();
const args = message.content.slice(prefix.length+cmd.length).trim().split('/ +/')
try{
    userID=message.channel.name.split('-').pop();
 }
catch(err){userID = message.author.id; }
if (message.channel.type==='dm') {
    reason = rList[message.author.id];
    try{

    var ticketNamerep1 = message.author.tag.replace(/#/g, "-");
    ticketName = ticketNamerep1.replace(/ /g, "-").toLowerCase();

console.log(userID);
    console.log(`${ticketName}-${userID}`/*.split("-").pop()*/);
const logMailCEmbed = new Discord.MessageEmbed();
logMailCEmbed.setColor('#05ff09')
logMailCEmbed.setAuthor(`Artistic Unity Support`,thumb)
logMailCEmbed.setTimestamp()
logMailCEmbed.setTitle("Thread Created")
logMailCEmbed.setThumbnail()
logMailCEmbed.setDescription(`Thread created by ${message.author.tag}.`)
if (message.attachments.size>0){logMailCEmbed.setImage(message.attachments.first().url)}
logMailCEmbed.setFooter(`USER: ${ticketName} | Subject: ${message.content}`)

    if ((!client.guilds.cache.get(modmailServerId).channels.cache.some(channel => channel.name.split('-').pop() === userID))) {
rList[message.author.id]=message.content;


    var channel = client.guilds.cache.get(modmailServerId).channels.create(`${ticketName}-${userID}`, {parent : ticketCategoryID});
channel.then(c => c.setTopic(reason)).then(c => c.send(logMailCEmbed));
reason = rList[message.author.id];
  const lc = client.channels.fetch(modmailLogChannelId).then(l => {l.send(logMailCEmbed)});
  
    const createMailEmbed = new Discord.MessageEmbed();
    createMailEmbed.setColor('#05ff23')
    createMailEmbed.setAuthor(`${serverName} Support`,thumb)
    createMailEmbed.setTimestamp()
    createMailEmbed.setTitle("Thread Created!")
    createMailEmbed.setThumbnail(thumb)
    createMailEmbed.setDescription("Thanks for your message, we'll get you soon. ✅")
    createMailEmbed.setFooter(`Thread-Opened: ${ticketName} | Subject: ${reason}`)

message.author.send(createMailEmbed);
}

}  
catch(err){
message.author.send(':x:Too many threads are open at the moment; please wait a bit and then try again. If you were not creating a thread, please DM a high ranking staff member with a screenshot of this message.')

message.react('❌');
console.log(err);
return;
    }
    reason=rList[userID];
    message.react('✅'); 
    const sc = client.guilds.cache.get(modmailServerId).channels.cache.find(channel => channel.name.split("-").pop() === userID);
    const inMailEmbed = new Discord.MessageEmbed();
    inMailEmbed.setColor('#5555F9')
    
    inMailEmbed.setAuthor(message.author.tag,message.author.avatarURL())
    inMailEmbed.setTimestamp()
    inMailEmbed.setTitle("New Message!")
    inMailEmbed.setThumbnail(thumb)
    inMailEmbed.setDescription(message.content)
    if (message.attachments.size>0){inMailEmbed.setImage(message.attachments.first().url)}
    
    inMailEmbed.setFooter(`Thread: ${ticketName} | Subject: ${reason}`)
    const ls = client.channels.fetch(modmailLogChannelId).then(l => {l.send(inMailEmbed)});
   
  
   try{sc.send(inMailEmbed);}
   catch(err){console.log(console.error())}
console.log(!(client.guilds.cache.get(modmailServerId).channels.cache.some(channel => channel.name === ticketName)));
}

if (message.channel.parentID === ticketCategoryID) {
    if (cmd === "reply" || cmd === "respond" || cmd==='r') {
var UID=message.channel.name.split("-").pop();
var user = client.users.cache.get(`${UID}`);
reason=rList[userID];
const outMailEmbed = new Discord.MessageEmbed();
    outMailEmbed.setColor('#F9A808')
    outMailEmbed.setAuthor(message.author.tag,message.author.avatarURL())
    outMailEmbed.setTimestamp()
    outMailEmbed.setTitle("Reply from Staff Support")
    outMailEmbed.setThumbnail(thumb)
    outMailEmbed.setDescription(args)
    if (message.attachments.size>0){outMailEmbed.setImage(message.attachments.first().url)}
    outMailEmbed.setFooter(`Thread in-use: ${(user.tag.replace(/#/g,'-')).replace(/ /g,'-')} | Subject: ${reason}`)
    const lso = client.channels.fetch(modmailLogChannelId).then(l => {l.send(outMailEmbed)});

console.log(user);
console.log(UID);
try{user.send(outMailEmbed);}
catch(err){console.log("error")}
message.react('📧');
    }
if (cmd==='areply' || cmd === 'arespond' || cmd === 'ar') {
    var UID=message.channel.name.split("-").pop();
    var user = client.users.cache.get(`${UID}`);
    reason=rList[userID];
    const outMailEmbed = new Discord.MessageEmbed();
        outMailEmbed.setColor('#F9A808')
        outMailEmbed.setAuthor('Anonymous Support Member', thumb)
        outMailEmbed.setTimestamp()
        outMailEmbed.setTitle("Reply from Staff Support")
        outMailEmbed.setThumbnail(thumb)
        outMailEmbed.setDescription(args)
      if (message.attachments.size>0){outMailEmbed.setImage(message.attachments.first().url)}
        outMailEmbed.setFooter(`Thread-Opened:${(user.tag.replace(/#/g,'-')).replace(/ /g,'-')} | Subject: ${reason}`)
        const outMailEmbedL = new Discord.MessageEmbed();
        outMailEmbedL.setColor('#F9A808')
        outMailEmbedL.setAuthor(`[ANONYMOUS REPLY] ${message.author.tag}`,message.author.avatarURL())
        outMailEmbedL.setTimestamp()
        outMailEmbedL.setTitle("Reply from Staff Support")
        outMailEmbedL.setThumbnail(thumb)
        outMailEmbedL.setDescription(args)
      if (message.attachments.size>0){outMailEmbedL.setImage(message.attachments.first().url)}
        outMailEmbedL.setFooter(`Thread-Opened: ${(user.tag.replace(/#/g,'-')).replace(/ /g,'-')} | Subject: ${reason}`)
        const lsao = client.channels.fetch(modmailLogChannelId).then(l => {l.send(outMailEmbedL)});
    console.log(user);
    console.log(UID);
    try{user.send(outMailEmbed);}
    catch(err){console.log("error")}
    message.react('📧');

}
if (cmd==='close' || cmd==='c') {
    reason=rList[userID];
    var UID=message.channel.name.split("-").pop();
    var user = client.users.cache.get(`${UID}`);
    const closeMailEmbed = new Discord.MessageEmbed();
    closeMailEmbed.setColor('#f70505')
    closeMailEmbed.setAuthor(`🔒Locked`, thumb)
    closeMailEmbed.setTimestamp()
    closeMailEmbed.setTitle("Modmail Closed")
    closeMailEmbed.setThumbnail(thumb)
    closeMailEmbed.setDescription("This modmail has been closed, have a great day.")
    closeMailEmbed.setFooter(`Thread Over: ${(user.tag.replace(/#/g,'-')).replace(/ /g,'-')} | Subject: ${reason}`)
  
    delete rList[UID];
     user.send(closeMailEmbed);
     message.channel.delete();
   
    const lcs = client.channels.fetch(modmailLogChannelId).then(l => {l.send(closeMailEmbed)});

}
}

;});

keepAlive();
client.login(token);

client.on('ready', () => {
var channel = client.channels.cache.get('848223590091849739');
    if (channel) channel.join();
});