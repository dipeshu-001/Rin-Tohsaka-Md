const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')
module.exports = class command extends Command {
    constructor() {
        super('shorturl', {
            description: 'Shorten the given url',
            category: 'utils',
            usage: 'shorturl <url>',
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let {context} = args
        try {
    let wthr = await axios.get(`https://api.shrtco.de/v2/shorten?url=${context}`)
    return void (await this.client.sendMessage(m.from,{text:`🌐 *Your Url :* ${wthr.data.result.full_short_link2}`},{quoted:m.message}))
    } catch (err) {
        console.log(err)
        return m.reply (`*Your url isn't valid*`)
        }
      }
    }
    