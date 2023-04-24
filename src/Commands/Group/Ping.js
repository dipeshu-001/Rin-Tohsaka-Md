const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('ping', {
            description: 'Tags all of the members in a group',
            usage: 'ping | --h | --admins',
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
        let {context , flags} = args ;

        const groupMetadata = await this.client.groupMetadata(m.from)
        
        const groupMembers = groupMetadata.participants.map((x) => x.id) || []
        
        const groupAdmins = groupMetadata.participants.filter((x) => x.admin).map((x) => x.id)
        
        const isAdmin = groupAdmins.includes(m.sender.jid)

        let send = m.sender
       
        if(!isAdmin) return m.reply('Only Admins can ping member')
       
        if(flags.includes('--h')){
            
            let text = `${context !== '' ? `*${context.replace(/--h\s*/, "")}*` : ''}`

            this.client.sendMessage(m.from,{text:text,mentions: groupMembers},{quoted:m.message})
        
        }

       else if(flags.includes('--admins')){

            let text= `${context !== '' ? `*${context.replace(/--admins\s*/, "")}*` : ''}`

            this.client.sendMessage(m.from , {text:text,mentions: groupAdmins},{quoted:m.message} )
        }
        
        else{

            let text = `${context !== '' ? `🧧 *Message: ${context}*\n\n` : ''}🍀 *Group:* ${groupMetadata.subject}\n📣 *Tagger: @${send.jid.split('@')[0]}*\n🎈 *Members:* ${groupMetadata.participants.length}\n`
            
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

}