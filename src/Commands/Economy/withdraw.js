/*

* All three variable declaration are important on every commands

*/

const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('withdraw', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'withdraw',

            aliases: ['withdraw'],

            cooldown: 10

        })

    }

  /**

  * @param {Message} m

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */

 execute = async (m, args) => {

  /*

  * Fetch username and jid

  * Important if pushing username on command

  */
  if (m.numbers.length < 1) return void m.reply('Specify the amount of gold to deposit')

  const { wallet , bank } = await this.helper.DB.getUser(m.sender.jid)

  if (m.numbers[0] > bank) return void m.reply(`You do not have enough gold in your bank to withdraw this amount.`)


  const updatedBank = bank - m.numbers[0];
const  updatedWallet = wallet + m.numbers[0];

await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: updatedWallet, bank: updatedBank });
//    await this.helper.DB.getUser(m.sender.jid, m.numbers[0], 'bank')

//    await this.helper.DB.getUser(m.sender.jid, -m.numbers[0])


return void m.reply(`💰Amount Withdrew: ${m.numbers[0]}\n\n🏦Withdrew from: Bank\n\n💳New Wallet Amount: ${updatedWallet}`);


}
}