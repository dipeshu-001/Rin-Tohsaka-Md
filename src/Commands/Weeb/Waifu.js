const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')
module.exports = class command extends Command {
    constructor() {
        super('waifu', {
            description: 'Sends a random waifus image',
            category: 'weeb',
            usage: 'waifu',
            exp: 10,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m) => {
        let text= 'here you go'
        const images  = await axios.get('https://api.waifu.pics/sfw/waifu')
        return void (await this.client.sendMessage(m.from, {image: {url: images.data.url} , caption: text},{quoted: m.message}))
        // return void (await m.reply(await this.helper.utils.getBuffer(getUrl), 'image' , text))
    }
}
