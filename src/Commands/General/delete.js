const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
// const { chat } = require('../../lib/openAi')
module.exports = class command extends Command {
    constructor() {
        super('delete', {
            description: 'Says hi to the bot',
            category: 'general',
            usage: 'hi',
            aliases: ['del'],
            exp: 15,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m , args) => {
        if (!m.quoted) return m.reply('Quote the message that you want me to delete, Baka!')
await this.client.sendMessage(m.from, {
    delete: m.quoted.key
})
}
}