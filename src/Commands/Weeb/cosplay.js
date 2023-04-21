const axios= require('axios')
const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('cosplay', {
            description: "Gives you random cosplay image",
            aliases: ['cos'],
            category: 'weeb',
            usage: 'cosplay',
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
        let wife = "https://cosplay-lovers-4pnv.onrender.com/cosplay";
        let buttons = [
          {
            buttonId: `cos`,
            buttonText: {
              displayText: `${process.env.PREFIX}cosplay`,
            },
            type: 1,
          },
        ];
        
        let buttonMessageds = {
            image: {url:wife},
            caption: `*✈ Here you Go*` ,
            footer: `${process.env.NAME}`,
            buttons: buttons,
            headerType: 4
        }
    
       
        this.client.sendMessage(m.from, buttonMessageds, {quoted: m.message,});
      }
    };
    