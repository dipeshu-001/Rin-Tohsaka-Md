const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('gpt', {
            description: 'Says hi to the bot',
            category: 'general',
            usage: 'gpt',
            exp: 15,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m , args) => {
        // if (!client.config.openai.apiKey) return M.reply('You have not provided an OpenAI API key in the config file')
        
        let {context} = args
        // const input = args.join(' ')
        if (context === null) return m.reply('Please provide some text to prompt the AI')
        try {

            const response = await this.helper.utils.chat(context)

            let res = response.response;

            let text = `Q. ${context}\n\nA. ${res.trim().replace(/\n\n/, '\n')}`;

            // let text = `Q. ${context}\n\n${'A.'+res}`
            return void (await m.reply(text))
            // await this.client.sendMessage(m.from , {text: text} ,{quoted: m})
        
        } catch (err) {
            m.reply(`Error kun: ${err}`)
        }
    }
}
