const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

 module.exports = class command extends Command {
  constructor() {
     super('claim', {
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

   if (!chara) {
     return void m.reply('There is no character available to claim.')
   }

   const { wallet } = await this.helper.DB.getUser(userJid)

   if (!wallet || wallet < price) {
     return void m.reply('You do not have enough money in your wallet. Please earn more.')
   }

   await this.helper.DB.group.updateOne({ jid: groupJid }, { $unset: { chara: 1 }, price: 0 })
   await this.helper.DB.user.updateOne({ jid: userJid }, { $inc: { wallet: -price } })

   // const gallery = await Gallery.findOneAndUpdate(
   //   { jid: userJid },
   //   { $push: { images: data.data.image } },
   //   { upsert: true, new: true }
   // )
   await this.helper.DB.user.updateOne({jid: userJid } , { $push: { url: wild } })
   await m.reply(`Congratulations! You have claimed ${chara} and saved its image to your gallery.`)
 }
}