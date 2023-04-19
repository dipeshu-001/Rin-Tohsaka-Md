const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('retrieve', {
            description: 'Retrieves a view once message',
            usage: 'retrieve [quote view once message]',
            cooldown: 10,
            category: 'utils',
            exp: 25
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m) => {
        if (!m.quoted || m.quoted.type !== 'viewOnceMessage')
            return void m.reply('Quote a view once message to retrieve, Baka!')
        const buffer = await m.downloadMediaMessage(m.quoted.message)
        const type = Object.keys(m.quoted.message.viewOnceMessage.message)[0].replace('Message', '')
        return void (await m.reply(buffer, type))
    }
}
