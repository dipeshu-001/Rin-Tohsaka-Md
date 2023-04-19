const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
   constructor() {
     super('bank', {
     description: "Displays the bot's usable commands",
     category: 'economy',
     exp: 20,
     usage: 'bank',
     aliases: ['bank'],
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
  const { bank, tag } = await this.helper.DB.getUser(m.sender.jid)
  // const users = await this.helper.DB.user.find({ wallet: { $gt: 0 } }, 'wallet jid -_id').sort({ wallet: -1 }).lean();
  // const rank = users.findIndex(u => u.jid === m.sender.jid) + 1
  const text = `🏦 *Bank* 🏦\n\n⛩️ *Name: ${m.sender.username}*\n\n 💮 *tag: #${tag}*\n\n🪙 *Gold: ${bank}*`
  return void (await m.reply(text))
}
}
