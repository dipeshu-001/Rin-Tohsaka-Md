const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
   constructor() {
     super('claim', {
     description: "Displays the bot's usable commands",
     category: 'character',
     exp: 20,
     usage: 'claim',
     aliases: ['c'],
     cooldown: 10

        })
   }

  /**
  * @param {Message} m
  * @param {import('../../Handlers/Message').args} args
  * @returns {Promise<void>}
  */
 
 execute = async (M, reply, sender, args) => {
        const res = this.handler.charaResponse.get(M.from)
        if (!res) return void M.reply('no chara to claim')
        const { wallet, gallery } = await this.helper.DB.getUser(M.sender.jid)
        if (res.price > wallet) return void M.reply(`Lol Check your wallet you don't have such gold to claim this`)
        this.handler.charaResponse.delete(M.from)
        await this.helper.DB.updateUser(M.sender.jid, 'wallet', 'inc', -res.price)
        gallery.push(res.data)
        await this.helper.DB.updateUser(M.sender.jid, 'gallery', 'set', gallery)
        return void M.reply(`You have claimed ${res.data.name}`)
    }
}
