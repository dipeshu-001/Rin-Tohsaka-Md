/*

* All three variable declaration are important on every commands

*/
const ONE_DAY_MS = 86400000;

const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('beg', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'beh',

            aliases: ['beg'],

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

 
  const { wallet, lastWorkTime } = await this.helper.DB.getUser(m.sender.jid);

  const now = Date.now();
  if (lastWorkTime && now - lastWorkTime < 2 * ONE_DAY_MS) {
    const remainingTime = new Date((lastWorkTime + 4 * ONE_DAY_MS) - now);
    return m.reply(`❌ You need to wait ${remainingTime.getUTCHours()} hours and ${remainingTime.getUTCMinutes()} minutes before working again.`);
  }
const users = await this.helper.DB.user.find({ $or: [ { wallet: { $gt: 0 } }, { bank: { $gt: 0 } } ] }, 'wallet bank jid -_id').sort({ wallet: -1, bank: -1 }).lean()
const rank = users.findIndex(u => u.jid === m.sender.jid) + 1;
const reward = Math.floor(Math.random() * 50) + 1; // Generate a random reward between 1 and 100

let text = `🙏 You begged and received `;
if (reward >= 50) {
  text += `${reward} gold from a rich guy! 💰💰💰`;

} else {
  text += `${reward} gold! 💰`;
}

const newBank = wallet + reward;
await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { $set: { wallet: newBank } });

return void (await m.reply(text));

    }
};