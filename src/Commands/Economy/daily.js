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
