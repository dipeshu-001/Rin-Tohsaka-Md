const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('ping', {
            description: 'Tags all of the members in a group',
            usage: 'ping | --h',
            category: 'group',
            exp: 35,
            cooldown: 15,
            aliases: ['all', 'tagall', 'everyone']
        })
    }
    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */
  
    execute = async (m, args) => { 
        let {context} = args ;

        const groupMetadata = await this.client.groupMetadata(m.from)
        const groupMembers = groupMetadata.participants.map((x) => x.id) || []
        const groupAdmins = groupMetadata.participants.filter((x) => x.admin).map((x) => x.id)
        const isAdmin = groupAdmins.includes(m.sender.jid)
        
        let send = m.sender
       
        if(!isAdmin) return m.reply('Only Admins can ping member')
       
        let text = `${context !== '' ? `🧧 *Message: ${context}*\n\n` : ''}🍀 *Group:* ${
            groupMetadata.subject
        }\n🎈 *Members:* ${groupMetadata.participants.length}\n📣 *Tagger: @${send.jid.split('@')[0]}*\n`

        if(context === '--h'){
            text+= `${context !== '' ? `🧧 *Message: ${context}*\n\n` : ''}`
        }
        const admins = []
        const members = []

        for (const user of groupMembers) {
            if (groupAdmins.includes(user)) {
                admins.push(user)

                continue
            }
            members.push(user)
        }

        for (let i = 0; i < admins.length; i++) text += `${i === 0 ? '\n\n' : '\n'}🌟 *@${admins[i].split('@')[0]}*`
        for (let i = 0; i < members.length; i++) text += `${i === 0 ? '\n\n' : '\n'}🎗 *@${members[i].split('@')[0]}*`

        await this.client.sendMessage(m.from, { text, mentions: groupMembers }, { quoted: m.message })
    }
    }