const axios= require('axios')
const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('animewallpaper', {
            description: 'Random anime wallpapers',
            category: 'weeb',
            usage: 'animewallpaper',
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
        
       let image =  'https://pic.re/image'
       let buttons = [
        {
          buttonId: `cos`,
          buttonText: {
            displayText: `${process.env.PREFIX}animewallpaper`,
          },
          type: 1,
        },
      ];
      
      let buttonMessageds = {
          image: {url:image},
          caption: `*✈ Here you Go*` ,
          footer: `${process.env.NAME}`,
          buttons: buttons,
          headerType: 4
      }
  
     
      this.client.sendMessage(m.from, buttonMessageds, {quoted: m.message,});
    }
}