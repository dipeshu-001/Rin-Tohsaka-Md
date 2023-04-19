const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const Carbon = require('unofficial-carbon-now')

module.exports = class command extends Command {
    constructor() {
        super('carbon', {
            description: 'Sends ',
            category: 'utils',
            usage: 'carbon [provide code/quote the message containing the code]',
            exp: 20,
            cooldown: 15
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        const { context } = args
        const code = context || m.quoted.content
        if (!code) return void m.reply('Provide the code you want as a carbon image, Baka!')
        try {
            const carbon = new Carbon.createCarbon()
                .setCode(code.replace(/\```/g, ''))
                .setBackgroundColor(this.helper.utils.generateRandomHex())
                .setExportSize(3)
            const buffer = await Carbon.generateCarbon(carbon)
            return void (await m.reply(buffer, 'image'))
        } catch (err) {
            this.helper.log(err.message, true)
            return void (await m.reply('An error occurred. Try again later'))
        }
    }
}
