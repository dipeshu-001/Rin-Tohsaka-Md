
const Command = require('../../Structures/Command')
const economyJs = require("../../Database/Models/Economy")
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('leaderboard', {
            description: 'Ban/unban users',
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
  execute = async (m, args ) => {
    let { flags } = args;

let users;
if (flags.includes('--group')) {
  if (!m.groupMetadata) {
    return void setTimeout(async () => await this.execute(m, flags, []), 3000);
  }
  const { participants } = m.groupMetadata;
  users = await Promise.all(participants.map(p => this.helper.DB.getUser(p.id)));
  flags.splice(flags.indexOf('--group'), 1);
} else {
  users = await this.helper.DB.user.find({});
}

const topUsers = users
  .sort((a, b) => (b.wallet + b.bank) - (a.wallet + a.bank))
  .slice(0, 10);

let text = `♕︎ *LEADERBOARD* ♕︎\n`;
text += `\n🔰 *Showing top ${topUsers.length} users*\n`;

for (let i = 0; i < topUsers.length; i++) {
  const { username } = this.helper.contact.getContact(topUsers[i].jid);
  const { wallet, bank , tag} = topUsers[i];
  text += `🏆 *#${i + 1}*\n
🌀 *Username:* ${username}#${users[i].tag}
💰 *Wealth:* ${wallet + bank} coins
🪙 *Wallet:* ${wallet} coins
🏦 *Bank:* ${bank} coins\n\n`;
}

return void m.reply(text);
};
}