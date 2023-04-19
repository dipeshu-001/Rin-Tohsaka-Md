const ONE_DAY_MS = 86400000;

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('daily', {

            description: "Daily reward for you",

            category: 'economy',

            exp: 20,

            usage: 'daily',

            cooldown: 10

        })

    }

  /**

  * @param {Message} m

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */

 execute = async (m, args) => {
    const { lastdaily, wallet } = await this.helper.DB.getUser(m.sender.jid);

  if (lastdaily && Date.now() - lastdaily < ONE_DAY_MS) {
    // User has already claimed their daily reward today
    const remainingMs = ONE_DAY_MS - (Date.now() - lastdaily);
    const remainingTime = new Date(remainingMs).toISOString().substr(11, 8); // Format the remaining time as HH:MM:SS
    return void m.reply(`You can claim your daily reward again in ${remainingTime}`);
  }

  const daily = 400;
  const newWallet = wallet + daily;

  await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { lastdaily: Date.now(), wallet: newWallet });

  return void m.reply(`🎉 Congratulations! You claimed your daily ${daily} gold! 💰`);
}

}