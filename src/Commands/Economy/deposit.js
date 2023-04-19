const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('deposit', {
            description: 'deposit amount to bank',
            category: 'economy',
            usage: 'ban [tag/quote users] --action=[ban/unban]',
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {

    if (m.numbers.length < 1) return void m.reply('Specify the amount of gold to deposit')

       const { wallet , bank } = await this.helper.DB.getUser(m.sender.jid)

       if (m.numbers[0] > wallet) return void m.reply(`You do not have enough gold in your wallet to deposit this amount.`)


       const updatedWallet = wallet - m.numbers[0];
    const updatedBank = bank + m.numbers[0];

    await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: updatedWallet, bank: updatedBank });
    //    await this.helper.DB.getUser(m.sender.jid, m.numbers[0], 'bank')

    //    await this.helper.DB.getUser(m.sender.jid, -m.numbers[0])


    return void m.reply(`💰Amount Deposited: ${m.numbers[0]}\n\n🏦Deposited in: Bank\n\n💳New Bank Amount: ${updatedBank}`);

}
   }