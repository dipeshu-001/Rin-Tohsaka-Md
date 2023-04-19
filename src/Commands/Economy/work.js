const economyJs = require("../../Database/Models/Economy")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('work', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'work',

            aliases: ['work'],

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
  const works =[
    'slave', 
    'engineer', 
    'servant', 
    'Man Eater' , 
    'Motherfucker' , 
    'prostitute' , 
    'Dildo lover' , 
    'Boku no pico lover', 
    'Dog'
];
  const { wallet } = await this.helper.DB.getUser(m.sender.jid);

  const reward = Math.floor(Math.random() * 200) + 1; // Generate a random reward between 1 and 100
  const workIndex = Math.floor(Math.random() * works.length);
  const workStr = works[workIndex];

  const newWallet = wallet + reward;
  await this.helper.DB.user.updateOne({ jid: m.sender.jid }, { wallet: newWallet });

  return void (await m.reply(`👨‍🏭 You worked hard as a ${workStr} and earned ${reward} gold! 💰`));
}
    }


