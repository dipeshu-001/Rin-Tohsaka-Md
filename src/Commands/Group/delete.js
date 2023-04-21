const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
// const { chat } = require('../../lib/openAi')
module.exports = class command extends Command {
    constructor() {
        super('delete', {
            description: 'Delete the selected message',
            category: 'group',
            usage: 'delete',
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

        const groupMetadata = await this.client.groupMetadata(m.from)
        const groupAdmins = groupMetadata.participants.filter((x) => x.admin).map((x) => x.id)
        const botNumber = await this.client.decodeJid(this.client.user.id);
        const isBotAdmin =  groupAdmins.includes(botNumber)
        const isAdmin = groupAdmins.includes(m.sender.jid)
        if(!isAdmin) return m.reply('User should be admin')
        if(!isBotAdmin) return m.reply('Bot should be admin')

        if (!m.quoted) return m.reply('Quote the message that you want me to delete, Baka!')
await this.client.sendMessage(m.from, {
    delete: m.quoted.key
})
}
}