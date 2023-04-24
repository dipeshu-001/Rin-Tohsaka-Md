const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

 module.exports = class command extends Command {
  constructor() {
     super('gallery', {
     description: "Claims the character",
     category: 'economy',
     exp: 20,
     usage: 'claim',
     cooldown: 10

        })
  }

  /**
  * @param {Message} m
  * @param {import('../../Handlers/Message').args} args
  * @returns {Promise<void>}
  */

 execute = async (m, args) => {
   const groupJid = m.from
   const userJid = m.sender.jid

   const { chara, price , wild } = await this.helper.DB.getGroup(groupJid)
   
   const { url } = await this.helper.DB.getGroup(groupJid)
//    if(!chara) return void m.reply('Nothing in gallery')
   if(!groupJid) return void m.reply('fuck off')

   await this.client.sendMessage(m.from , {image: {url: url} , caption: 'HMMM'} , {quoted: m.quoted})

 
 }
}