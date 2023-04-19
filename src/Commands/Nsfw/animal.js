const Command = require('../../Structures/Command')
const axios  = require('axios')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {

    constructor() {

        super('animal', {

            description: 'Sends random animal image',

            category: 'nsfw',

            usage: 'animal',

            exp: 20,

            cooldown: 5

        })

    }

    /**

     * @param {Message} m

     * @returns {Promise<void>}

     */

    execute = async (m) => {

        let buff= await axios.get(`https://fantox-apis.vercel.app/animal`)

    let imgURL = buff.data.url
    

    }
}
