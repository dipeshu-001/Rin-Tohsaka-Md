
const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('join', {
            description: 'Join the group using the link',
            dm: true,
            usage: 'join [link]',
            category: 'dev'
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args , client) => {
        let {context} = args
        if (!context) return m.reply('Sorry you did not give any group link!')
        if (!context.includes('whatsapp.com')) return m.reply('Sorry you did not give any valid group link!')
        const JoinCode = context.split('https://chat.whatsapp.com/')[1]
        console.log(JoinCode)
        this.client
            .groupAcceptInvite(JoinCode)
            .then((res) => m.reply('Joined'))
            .catch((res) => m.reply('Something went wrong please check the link'))
    }
}