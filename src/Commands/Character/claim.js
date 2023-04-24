const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

 module.exports = class command extends Command {
  constructor() {
     super('claim', {
     description: "Claims the character",
     category: 'economy',
     exp: 20,
     usage: 'claim',
     cooldown: 10

        })
  }

  /**
  * @param {Message} m
  * @param {import('../../Handlers/Message').args} args
  * @returns {Promise<void>}
  */

 execute = async (m, args) => {

   
}
};