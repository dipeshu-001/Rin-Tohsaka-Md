const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const { description, homepage, name } = require('../../../package.json')

module.exports = class command extends Command {
    constructor() {
        super('info', {
            description: "Displays bot's info",
            aliases: ['bot'],
            category: 'general',
            exp: 100,
            usage: 'info',
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m) => {
        const groups = await this.helper.DB.group.find({})
        const users = await this.helper.DB.user.find({})
        const pad = (s) => (s < 10 ? '0' : '') + s
        const formatTime = (seconds) => {
            const hours = Math.floor(seconds / (60 * 60))
            const minutes = Math.floor((seconds % (60 * 60)) / 60)
            const secs = Math.floor(seconds % 60)
            return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
        }
        const uptime = formatTime(process.uptime())                                                                                                                                                                                               
        return void m.reply(`🎐 *JILL_INFO* 🎐\n\n♦️ *Commands* : ${                                                                                                                                                                                                                            
        Array.from(this.handler.commands, ([command, data]) => ({command,data})).length}\n\n🔰 *Groups* : ${groups.length}\n\n⏱️ *Uptime* : ${uptime}\n\n👥 *Users* : ${users.length}`)               
  }

}
