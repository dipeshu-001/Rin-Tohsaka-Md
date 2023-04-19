const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')
module.exports = class command extends Command {
    constructor() {
        super('google', {
            description: 'Search google in whatsapp',
            category: 'utils',
            usage: 'google <search>',
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let {context} = args
        // const input = args.join(' ')
        if (context === null) return m.reply('Please provide some text to search on google')

await axios.get(`https://www.googleapis.com/customsearch/v1?q=${context}&key=AIzaSyABA9H2sDYVwY0sDE7bqYUxihdixoL3ozM&cx=baf9bdb0c631236e5`)
.then((res) => {
    if (res.status !== 200) return void m.reply(`🔍 Error: ${res.status}`);
    let text = ``;
    for (const item of res.data?.items) {
        text += `*📒 Title* : ${item.title}\n*🔗Link* : ${item.link}\n*🎯 Description* : ${item.snippet}\n\n`;
    }
 let urll = "https://i.ibb.co/23JpZG5/google-logo-png-29532.png"

 return void (this.client.sendMessage(m.from, {image: {url: urll} , caption: text},{quoted: m.message}))

//  this.client.sendMessage(m.from,{image:{url:urll}, caption:result},{quoted:m})
})
.catch((err) => {
  m.reply(`🔍 Error: ${err}`);
});
    }
}