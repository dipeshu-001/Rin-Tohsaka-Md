const Command = require('../../Structures/Command')

module.exports = class command extends Command {

     constructor() {
          super('mods', {
               description: 'Shows bot owner',
               category: 'general',
               usage: 'mods',
               exp: 15,
               cooldown: 5,
               aliases: ['mod', 'owner', 'moderators']

          })
     }
}


    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

     execute = async (M) => {


    execute = async (m) => {

        if (!this.helper.config.mods.length) return void m.reply('*[UNMODERATED]*')

        let text ="*❱❱❱❱❱ _MODS_ ❰❰❰❰❰*\n\n"


const mentions = []

this.helper.config.mods.map((x)=>{
text+= `*❯ @${this.helper.contact.getContact(x).jid.split('@')[0]}*\n`
mentions.push(this.helper.contact.getContact(x).jid)

})

        return void this.client.sendMessage(m.from,{text:text, mentions:mentions})

    }

}
