const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')
module.exports = class command extends Command {
    constructor() {
        super('support', {
            description: "Displays the bot's support group link",
            category: 'general',
            exp: 20,
            usage: 'supprt',
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        m.reply(`Support group link have been sent to your dm.`)
        let gif = 'https://telegra.ph/file/0405b77936b0ebd67f3f1.mp4'
        let text = `\n🆘 *Support*
Need help with using the bot? Join our official support group on WhatsApp! Our community of users and developers will be happy to assist you. 

📲 *Join our WhatsApp group*:  https://chat.whatsapp.com/DZwunmSD5rn7WmCP5vDIqm

🌟 *GitHub Repository*
You can also check out our GitHub repository for the bot's source code, report bugs, and suggest new features. Don't forget to give us a star if you find the bot useful!

📂 *Repository Link*:  https://github.com/Toshi-san001/Rin-Tohsaka`
        await this.client.sendMessage(
            m.sender.jid,
            {
                video:{url:gif}, 
                gifPlayback: true ,
                caption:text
            },
            {
                quoted:m.message
            })
    }
}
