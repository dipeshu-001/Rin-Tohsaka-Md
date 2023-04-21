const axios= require('axios')
const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('animeQuotes', {
            description: 'Random anime quotes',
            aliases: ['aniquo' , 'animequote'],
            category: 'weeb',
            usage: 'anime [query]',
            exp: 20,
            cooldown: 20
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        
        try {
            

            const api = await axios.get(`https://animechan.vercel.app/api/random`)
            
            let fetch = api.data

            let randomText = `*✏ Quote: ${fetch.quote}*\n\n*🎗 Said by: ${fetch.character}*\n\n*📛 Source: ${fetch.anime}*`;

            m.reply(randomText)
        } catch (error) {
            console.error(error);
            m.reply("❌ An error occurred while fetching the quote. Please try again later.")
        }
    }
}
