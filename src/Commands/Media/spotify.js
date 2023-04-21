const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const Spotify = require('../../lib/spotify')
module.exports = class command extends Command {
    constructor() {
        super('spotify', {
            description: 'To download a spotify audio',
            usage: 'spotify',
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
        if (!context) return m.reply("Where is the url of spotify?")
 
        
        const spotify = new Spotify(context)
        const info = await spotify.getInfo()
        if ((info).error) return void m.reply('Provide a valid spotify track URL, Baka!')
        const { name, artists, album_name, release_date, cover_url } = info
        const details = `🎧 *Title:* ${name || ''}\n🎤 *Artists:* ${(artists || []).join(
            ','
        )}\n💽 *Album:* ${album_name}\n📆 *Release Date:* ${release_date || ''}`
       const response = await this.client.sendMessage(m.from, { image: { url: cover_url }, caption: details }, { quoted: m.message })
        const buffer = await spotify.download()
        await this.client.sendMessage(m.from, { audio: buffer }, { quoted: response })
    

    }
}