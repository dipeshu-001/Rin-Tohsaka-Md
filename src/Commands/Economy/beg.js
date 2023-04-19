/*

* All three variable declaration are important on every commands

*/
const moment = require('moment-timezone');

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
  const { wallet, tag } = await this.helper.DB.getUser(m.sender.jid);
const users = await this.helper.DB.user.find({ $or: [ { wallet: { $gt: 0 } }, { bank: { $gt: 0 } } ] }, 'wallet bank jid -_id').sort({ wallet: -1, bank: -1 }).lean()
const rank = users.findIndex(u => u.jid === m.sender.jid) + 1;
const reward = Math.floor(Math.random() * 100) + 1; // Generate a random reward between 1 and 100

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