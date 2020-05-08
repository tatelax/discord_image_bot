const Discord = require('discord.js')
const client = new Discord.Client();
const gis = require('g-i-s');
const fs = require('fs');

client.once('ready', () => {
  console.log('Tatelax\'s image bot has started successfully!')
});

client.on('message', message => {
    if(!message.content.startsWith('/img')) return;

    var query = message.content.replace('/img ', '')
    var searchingMessage = 'Searching for ' + message.member.user.tag + '\'s ' + '\"' + query + '\"' + '...'

    message.channel.send('🔍 ' + searchingMessage)
    console.log(new Date().toUTCString() + " : " + searchingMessage)

    fs.appendFile("./log.txt", new Date().toUTCString() + " : " + searchingMessage + "\n", function(err) {
        if(err) {
            return console.log("Problem saving the log file... " + err);
        }
    });

    gis(query, function search(error, results) {
        if (error) {
            console.log(error);
        } else {
            var index = getRandomInt(0, results.length)
            var selectedResult

            try {
                selectedResult = JSON.parse(JSON.stringify(results, null, ' '))[index].url
            } catch (err) {
                console.log('There was a problem! ' + "\n" + err)
            }

            var resultMessage = "Result for " + message.member.user.tag + '\'s ' + '\"' + query + '\"' + " found! \n" + selectedResult + "\n"


            message.channel.send("💡 " + resultMessage)
            console.log(new Date().toUTCString() + " : " + resultMessage)

            fs.appendFile("./log.txt", new Date().toUTCString() + " : " + resultMessage + "\n", function(err) {
                if(err) {
                    return console.log("Problem saving the log file... " + err);
                }
            });
        }
    })
})

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

client.login(process.env.TELEGRAM_BOT_KEY)
