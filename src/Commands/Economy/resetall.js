const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
   constructor() {
     super('resetall', {
     description: "Reset all economy money",
     category: 'dev',
     exp: 20,
     usage: 'resetall'

        })
   }

  /**
  * @param {Message} m
  * @param {import('../../Handlers/Message').args} args
  * @returns {Promise<void>}
  */
 execute = async (m, reply, sender, args) => {
        const users = await this.helper.DB.user.find()
    
        for (const { jid } of users) {
            await this.helper.DB.user.updateOne({ jid }, { wallet: 0, bank: 0 });
        }
        // await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: updatedWallet, bank: updatedBank });
        return void m.reply(`All users bank and wallet has been reset successfully! ${users.length}`)
    }
}
