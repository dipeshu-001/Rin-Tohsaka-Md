const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
// const { chat } = require('../../lib/openAi')
module.exports = class command extends Command {
    constructor() {
        super('demote', {
            description: 'Demote admin',
            category: 'group',
            usage: 'demote [@mention]',
            exp: 15,
            cooldown: 5
        })
    }

    execute = async (m , args) => {

        const groupMetadata = await this.client.groupMetadata(m.from)
        const groupAdmins = groupMetadata.participants.filter((x) => x.admin).map((x) => x.id)
        const botNumber = await this.client.decodeJid(this.client.user.id);
        const isBotAdmin =  groupAdmins.includes(botNumber)
        const isAdmin = groupAdmins.includes(m.sender.jid)
        if(!isAdmin) return m.reply('User should be admin')
        if(!isBotAdmin) return m.reply('Bot should be admin')

        let users =m.mentioned

        if (!users) {
            if (m.quoted && !users.includes(m.quoted.sender.jid)) users = [m.quoted.sender.jid]
            if (users.length < 1) return void m.reply('Tag or quote a user to use this command')
        }
        const username = users === m.sender.jid ? m.sender.username : this.helper.contact.getContact(users).username
		await this.client.groupParticipantsUpdate(m.from, [users], "demote")
		await this.client.sendMessage(m.from,{text:`Successfully demoted ${username}`},{quoted:m.message})
	}
}
