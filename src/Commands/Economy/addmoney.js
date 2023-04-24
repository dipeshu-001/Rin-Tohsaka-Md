const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
   constructor() {
     super('addmoney', {
     description: "Displays the bot's usable commands",
     category: 'economy',
     exp: 20,
     usage: 'bank',
     cooldown: 10

        })
   }

  /**
  * @param {Message} m
  * @param {import('../../Handlers/Message').args} args
  * @returns {Promise<void>}
  */
 execute = async (m, reply, sender, args) => {
  /*
  * Fetch username and jid
  * Important if pushing username on command
  */
 let wallet = 92392323232322;
  await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: wallet });
  m.reply(`${wallet}`)
}
}
