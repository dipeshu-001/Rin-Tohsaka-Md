const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('help', {
            description: "Displays the bot's usable commands",
            category: 'general',
            exp: 20,
            usage: 'help || help <command_name>',
            aliases: ['h'],
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        const { context } = args
        if (!context) { 
            const buffer = await this.helper.utils.getBuffer('https://telegra.ph/file/2f013ec99ff1284e1c9a1.mp4')
            const commands = Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
            }))
            let text = `Konichiwa! *@${m.sender.jid.split('@')[0]}*, I'm ${
                this.helper.config.name}
            \nMy prefix is - "${this.helper.config.prefix}"\n\nThe usable commands are listed below.`
            const categories = []
            for (const command of commands) {
                if (command.data.config.category === 'dev') continue
                if (categories.includes(command.data.config.category)) continue
                categories.push(command.data.config.category)
            }
            for (const category of categories) {
                const categoryCommands = []
                const filteredCommands = commands.filter((command) => command.data.config.category === category)
                text += `\n\n*${this.emojis[categories.indexOf(category)]} ${this.helper.utils.capitalize(category)}*\n\n`
                filteredCommands.forEach((command) => categoryCommands.push(command.data.name))
                text += `\`\`\`${categoryCommands.join(', ')}\`\`\``
            }
            text += `\n\n📕 *Note:* Use ${this.helper.config.prefix}help <command_name> for more info of a specific command. Example: *${this.helper.config.prefix}help hello*`
            return void (await m.reply(buffer, 'video', true, undefined, text, [m.sender.jid]))
        } else {
            const cmd = context.trim().toLowerCase()
            const command = this.handler.commands.get(cmd) || this.handler.aliases.get(cmd)
            if (!command) return void m.reply(`No command found | *"${context.trim()}"*`)
            return void m.reply(
                `🎐 *Command:* ${this.helper.utils.capitalize(command.name)}\n🎴 *Aliases:* ${
                    !command.config.aliases
                        ? ''
                        : command.config.aliases.map((alias) => this.helper.utils.capitalize(alias)).join(', ')
                }\n🔗 *Category:* ${this.helper.utils.capitalize(command.config.category)}\n⏰ *Cooldown:* ${
                    command.config.cooldown ?? 3
                }s\n🎗 *Usage:* ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.helper.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n🧧 *Description:* ${command.config.description}`
            )
        }
        
        
     }
        
emojis = [ '💰','☘️','🧧','🍒','🎮','🎐','🍁']
     

}
