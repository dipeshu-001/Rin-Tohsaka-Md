const moment = require('moment-timezone')
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
  const { lastDaily, wallet } = await this.helper.DB.getUser(m.sender.jid);
  const now = moment.utc(); // Define now using moment.utc() for UTC time
  if (lastDaily) {
    const timeDiff = moment.duration(now.diff(lastDaily)).asHours();
    if (timeDiff < 24) {
      const timeRemaining = moment.utc(moment.duration(24 - timeDiff, 'hours').asMilliseconds()).format('HH:mm:ss');
      return m.reply(`${m.sender.username} have already claimed his daily reward. You can claim again in ${timeRemaining}.`);
    }
  }
  
  //const remainingTime = new Date(remainingMs).toISOString().substr(11, 8); // Format the remaining time as HH:MM:S


const daily = 400;
const newWallet = wallet + daily;

await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: newWallet, lastDaily: now });

return void m.reply(`🎉 Congratulations! You claimed your daily ${daily} gold! 💰`);
}

}
