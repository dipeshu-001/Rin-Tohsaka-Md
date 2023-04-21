const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('tiktokvideo', {
            description: 'To download a video from TikTok link',
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
          { quoted: m }
        );

        if(!context.includes("tiktok")){
          return m.reply("❌ No Link Provided!")
        }

        this.helper.utils.Tiktok(context).then( data => {
        this.client.sendMessage(m.from, { video: { url: data.watermark },caption:`*Here you go 😋*`},{ quoted: m.message })
        })
        }
    }