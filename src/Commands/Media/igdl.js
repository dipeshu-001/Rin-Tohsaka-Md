const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')
module.exports = class command extends Command {
    constructor() {
        super('igdl', {
            description: 'download instagram video',
            usage: 'igdl',
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
        let arg = context
        if (!arg === null)
      return Miku.sendMessage(
        m.from,
        { text: `Please provide a Instagram Video link !` },
        { quoted: m }
      );
    if (!arg.includes("instagram.com"))
      return this.client.sendMessage(
        m.from,
        { text: `Please provide a valid Instagram Video link !` },
        { quoted: m.message }
      );
    

      var queryURL = arg
      m.reply("*Please wait, Your video is being download..*")
      let res = await axios.get("https://fantox001-scrappy-api.vercel.app/instadl?url=" + queryURL)
      const scrappedURL = res.data.videoUrl
      
      return this.client.sendMessage(m.from, { video: { url: scrappedURL }},{ quoted: m.message } );
  }
}

