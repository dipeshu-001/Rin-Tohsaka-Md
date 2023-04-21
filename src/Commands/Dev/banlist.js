const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('banlist', {
            description: 'Display the banned users',
            dm: true,
            usage: 'banlist',
            category: 'general'
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args , client) => {
        const bannedUsers = await this.helper.DB.user.find({ ban: true })
        if (bannedUsers.length === 0) {
            return void m.reply('There are no banned users')
        }
        // let users = bannedUsers.map(user.jid)
        // const text = `🚦 *Banned Users:*\n` + bannedUsers.map(user => `*@${user.jid.split('@')[0]}*`).join('\n')
        // return void m.reply(text, 'text'
        // return void this.client.sendMessage(M.from,{text:text, mentions:mentions}))

        let text ="*❱❱❱❱❱ BANLIST ❰❰❰❰❰*\n\n"

        const mentions = []
        bannedUsers.map((x)=>{
            text+= `*❯ @${x.jid.split('@')[0]}*\n`
            mentions.push(x.jid)

        })
        return void this.client.sendMessage(m.from,{text:text, mentions:mentions})
    }
}
