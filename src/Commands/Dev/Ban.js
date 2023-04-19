const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('ban', {
            description: 'Ban/unban users',
            category: 'dev',
            usage: `ban [tag/quote users] Reason or |`,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let [users] =m.mentioned
    let reason = m.content.split(/ +\| +| +reason +/i).slice(1)
    if (!users) {
        if (m.quoted && !users.includes(m.quoted.sender.jid)) users = [m.quoted.sender.jid]
        if (users.length < 1) return void m.reply('Tag or quote a user to use this command')
    } else {
        users = users.split(/ +/).filter(Boolean)
    }

    let text = `🚦 *State: BANNED*\n⚗ *Users:*\n`
    for (const user of users) {
        const info = await this.helper.DB.getUser(user)
        if (info.ban) {
            text += `\n*@${user.split('@')[0]}* is already banned`
            if (reason) {
                text += `\n⚠️ *Reason:* ${reason}`
            }
            continue
        }
        text += `\n*@${user.split('@')[0]}*`
        await this.helper.DB.user.updateOne({ jid: user }, { $set: { ban: true } })
    }
    
    if (reason) {
        text += `\n⚠️ *Reason:* ${reason}`
    }
    
    return void (await m.reply(text, 'text', undefined, undefined, undefined, users))
}
}
