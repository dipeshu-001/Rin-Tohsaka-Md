const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

 module.exports = class command extends Command {
  constructor() {
     super('wallet', {
     description: "Shows user wallet",
     category: 'economy',
     exp: 20,
     usage: 'wallet',
     aliases: ['wallet'],
     cooldown: 10

        })
  }

  /**
  * @param {Message} m
  * @param {import('../../Handlers/Message').args} args
  * @returns {Promise<void>}
  */

 execute = async (m, args) => {
   const { wallet, tag } = await this.helper.DB.getUser(m.sender.jid)
   const users = await this.helper.DB.user.find({ wallet: { $gt: 0 } }, 'wallet jid -_id').sort({ wallet: -1 }).lean();
   const rank = users.findIndex(u => u.jid === m.sender.jid) + 1
   const text = `🏦 *Wallet* 🏦\n\n⛩️ *Name: ${m.sender.username}*\n\n 💮 *tag: #${tag}*\n\n🪙 *Gold: ${wallet}*\n\n🏆 *Leaderboard rank: ${rank}*`
   return void (await m.reply(text))
 }
 }
