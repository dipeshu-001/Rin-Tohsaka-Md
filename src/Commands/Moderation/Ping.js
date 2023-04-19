const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('ping', {

            description: 'Tags all of the members in a group',

            usage: 'ping (--tags=hidden)',

            category: 'moderation',

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

  

    
     execute = async(client, m, { text, groupName,flags, args,command,isAdmin,participants,groupAdmin,pushName,iscreator}) => {

		if(!isAdmin) return client.sendMessage(m.from,{text:"This is admin only command"},{quoted:m})

        flags.forEach((flag) => (text = text.replace(flag, '')))

        const message = args ? args.join(' ') : m.quoted ? m.quoted.msg : ''

        let  menText = `${message !== '' ? `🧧 *Message:* ${message}\n\n` : ''}🍀 *Group:* ${

          groupName

        }\n👥 *Members:* ${participants.length}\n📣 *Tagger: @${

            m.sender.split('@')[0]

        }*

        `

        const admins = []

        const members= []

        if(flags.includes('--h')){

            const message = text ?text : m.quoted ? m.quoted.msg : ''

            let  menText = `${message !== '' ? `🧧 *Message:* ${message}\n\n` : ''}🍀 *Group:* ${

              groupName

            }\n👥 *Members:* ${participants.length}\n📣 *Tagger: @${

                m.sender.split('@')[0]

            }*

            `

            client.sendMessage(m.from,{text:menText,mentions: participants.map(a => a.id)},{quoted:m})

        

        }

else{for (let memNum of participants) {

 if( groupAdmin.includes(memNum.id) === true ) { 

        var emo = '👑'

  

   admins.push(memNum.id)  

} else { 

    var emo = '❄️'

members.push(memNum.id)

    //menText += `${emo} *@${memNum.id.split('@')[0]}*\n`

 } //members_id.push(memNum.jid)

}

for (let i = 0; i < admins.length; i++){ menText += `${i === 0 ? '\n\n' : '\n'}🥇 *@${admins[i].split('@')[0]}*`}

for (let i = 0; i < members.length; i++){

menText+= `${i === 0 ? '\n\n' : '\n'}🥈 *@${members[i].split('@')[0]}*`

}  

client.sendMessage(m.from,{text:menText,mentions: participants.map(a => a.id)},{quoted:m})

    }
}
  }
	

  

                

            
        
