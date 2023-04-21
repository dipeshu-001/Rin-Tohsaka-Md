const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const findLyrics = require('simple-find-lyrics')
module.exports = class command extends Command {
    constructor() {
        super('lyrics', {
            description: 'To get music lyrics',
            usage: 'lyrics',
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
        if (!context) return m.reply("❌ No query provided!")

        try {
            const lyrics = await findLyrics(context)
            if (lyrics.lyrics == '') return
            var txt = `*📕 Title :* ${lyrics.title}\n*🧑🏻‍🎤 Artist :* ${lyrics.artist}\n*🎶 Lyrics :-* \n${lyrics.lyrics}`

            await this.client.sendMessage(m.from, {text:txt},{quoted:m.message})
} catch (err) {
    console.log(err)
    }
    

    }
}