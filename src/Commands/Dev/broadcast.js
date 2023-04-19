const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('broadcast', {
            description: 'Broadcast Message to all groups',
            dm: true,
            aliases: ["bc"],
            usage: 'bc [Broadcast mesage]',
            category: 'dev'
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args , client) => {
        let { context } = args
       if (!context) return m.reply('No query provided!')
       const getGroups = await this.client.groupFetchAllParticipating()
       const groups = Object.entries(getGroups)
           .slice(0)
           .map((entry) => entry[1])
       const res = groups.map((v) => v.id)
       m.reply(`Broadcasting in ${res.length} Group Chat, in ${res.length * 1.5} seconds`)
       for (let i of res) {
           const groupMetadata = await this.client.groupMetadata(i)
           const groupMembers = groupMetadata?.participants.map((x) => x.id) || []
           const text = `🔰*「 ${process.env.NAME}\'s BROADCAST 」*🔰\n\n🏮 Message: ${context}`
           await this.client.sendMessage(i, {
               video: {
                   url: 'https://telegra.ph/file/f0c24da2961de0bede5e1.mp4'
               },
               gifPlayback: true,
               mentions: groupMembers,
               caption: `${text}`
           })
       }
       m.reply(`✅ Broadcast Message sent to *${res.length} groups*.`)
   
    }
}