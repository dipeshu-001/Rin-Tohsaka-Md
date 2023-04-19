const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('tiktok', {
            description: 'To download a video from TikTok link',
            usage: 'tiktok',
            category: 'Media',
            exp: 20,
            dm: false,
            cooldown: 0
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let {context} = args
        if (!context === null)
        return this.client.sendMessage(
          m.from,
          { text: `Please provide a Tiktok Video link !` },
          { quoted: m.message }
        );

        if(!context.includes("tiktok")){
          return m.reply("Please provide a valid Tiktok link!")
        }

        let buttons = [
            {
              buttonId: `${process.env.PREFIX}tiktokmp3 ${context}`,
              buttonText: { displayText: "♬ Audio" },
              type: 1,
            },
            {
              buttonId: `${process.env.PREFIX}tiktokmp4 ${context}`,
              buttonText: { displayText: "▶ Video" },
              type: 1,
            },
            {
              buttonId: `${process.env.PREFIX}tiktokdoc ${context}`,
              buttonText: { displayText: "∎ Document" },
              type: 1,
            },
          ];
        let  textCap = `*『 Tiktok Downloader 』*\n\n*🧩 Video Url :* _${context}_\n*📌 Select the format*
*${process.env.PREFIX}tiktokmp3 <link>*
*${process.env.PREFIX}tiktokmp4 <link>*
*${process.env.PREFIX}tiktokdoc <link>*`

          let buttonMessage = {
            image: {url : 'https://preview.redd.it/8g7mcw6mnx481.png?width=640&crop=smart&auto=webp&v=enabled&s=99bcf6850390f4643fee7e6f4e9b622e1614850e'},
            caption: textCap,
            footer: `${process.env.NAME}`,
            buttons: buttons,
            headerType: 1
          };
          this.client.sendMessage(m.from, buttonMessage, { quoted: m.message });
        }
    }
    