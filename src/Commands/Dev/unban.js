const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('unban', {
            description: 'unban users',
            category: 'dev',
            usage: 'ban [tag/quote users] --action=[ban/unban]',
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        const users = m.mentioned
        if (m.quoted && !users.includes(m.quoted.sender.jid)) users.push(m.quoted.sender.jid)
        if (users.length < 1) return void m.reply('Tag or quote a user to use this command')

        let text = `🚦 *State: UNBANNED*\n⚗ *Users:*\n`
        for (const user of users) {
            const info = await this.helper.DB.getUser(user)
            if (!info.ban) {
                text += `\n*@${user.split('@')[0]}* - User is not banned`
                continue
            }
            text += `\n*@${user.split('@')[0]}*`
            await this.helper.DB.user.updateOne({ jid: user }, { $set: { ban: false } })
        }
        return void (await m.reply(text, 'text', undefined, undefined, undefined, users))
    }
}