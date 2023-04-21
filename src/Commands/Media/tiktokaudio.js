const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('tiktokaudio', {
            description: 'To download a tiktok audio',
            usage: 'tiktok',
            category: 'Media',
            exp: 20,
            dm: false,
            cooldown: 50
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let {context} = args
        if (!context)
        return this.client.sendMessage(
          m.from,
          { text: `❌ No Link Provided!` },
          { quoted: m.message }
        );

        if(!context.includes("tiktok")){
          return m.reply("❌ Invalid Link")
        }

        this.helper.utils.Tiktok(context).then( data => {
        this.client.sendMessage(m.from, { audio: { url: data.audio },mimetype: "audio/mpeg",},{ quoted: m.message })
        })
        }
    }