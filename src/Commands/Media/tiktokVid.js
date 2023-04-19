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
          { text: `Please provide a Tiktok Video link !` },
          { quoted: m }
        );

        if(!context.includes("tiktok")){
          return m.reply("Please provide a valid Tiktok link!")
        }

        this.helper.utils.Tiktok(context).then( data => {
        this.client.sendMessage(m.from, { video: { url: data.watermark },caption:`Downloaded by: *${botName}*`},{ quoted: m.message })
        })
        }
    }