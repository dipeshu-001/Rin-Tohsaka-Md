const items = require("../../Database/Models/Shop")

const Command = require('../../Structures/Command')

const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('shop', {

            description: "Displays the bot's usable commands",

            category: 'economy',

            exp: 20,

            usage: 'shop',

            aliases: ['shop'],

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

    // Get user ID from mention

let message = "🛍️ *SHOP* 🛍️\n\n";

    items.forEach(item => {

      message += `♦️ *Name* : ${item.itemName}\n\n☘️ *Desc* : ${item.description}\n\n💰 *Price* : ${item.price}\n\n🔰 *ItemNumber* : ${item.number}\n`;

    });

  return void m.reply(message);

  }

};
