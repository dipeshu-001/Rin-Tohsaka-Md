const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('gamble left/right', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'gamble',

            aliases: ['gamble'],

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

let { wallet , bank } = await this.helper.DB.getUser(m.sender.jid)

if (m.numbers[0] > wallet) return void m.reply(`You do not have enough gold in your wallet to deposit this amount.`)



        // Simulate rolling two dice

        const left = Math.floor(Math.random() * 6) + 1;

        const right = Math.floor(Math.random() * 6) + 1;

        const total = left + right;

        if (total >= 7) {
            // Win condition: roll a total of 7 or higher
            const wonAmount = m.numbers[0];
            wallet += wonAmount;
            await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: wallet });
            return void m.reply(`You won ${wonAmount} coins! 🎉🎉🎉\n\nDice Roll: 🎲 ${left} | ${right} 🎲\nTotal: ${total}`);
        } else {
            // Lose condition: roll a total of less than 7
            const lostAmount = m.numbers[0];
            wallet -= lostAmount;
            await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: wallet });
            return void m.reply(`You lost ${lostAmount} coins. 😢😢😢\n\nDice Roll: 🎲 ${left} | ${right} 🎲\nTotal: ${total}`);
        }
        
    }
}
