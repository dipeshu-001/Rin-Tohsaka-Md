const axios = require("axios")
const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('cosplay', {
            description: "Gives you details of genshin characher.",
            aliases: ['gi' , 'gchara'],
            category: 'weeb',
            usage: 'genshin <any genshin characher name>',
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
        
try{
    let {context} = args

    let api = await axios.get(`https://api.genshin.dev/characters/${context}`)
        
let txt = ""
txt += `🎀 *Name:* ${api.data.name}\n`
txt += `🎖️ *Title:* ${api.data.title}\n`
txt += `💠 *Vision:* ${api.data.vision}\n`
txt += `🏹 *Weapon:* ${api.data.weapon}\n`
// txt += `💮 *Gender:* ${api.data.gender}\n`
txt += `🌏 *Nation:* ${api.data.nation}\n`
txt += `🌏 *Birthday:* ${api.data.birthday}\n`
txt += `🪷 *Affiliation:* ${api.data.affiliation}\n`
txt += `🌟 *Rarity:* ${api.data.rarity}\n`
txt += `❄️ *Constellation:* ${api.data.constellation}\n`
txt += `📖 *Description:* ${api.data.description}\n`
txt += `🌐 *Url:* https://genshin-impact.fandom.com/wiki/${context}\n`


let image = `https://api.genshin.dev/characters/${context}/portrait` 
// this.client.sendMessage(m.from , {image: {url: image} , caption: txt})
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
      image: {url:image},
      caption: txt ,
      footer: `${process.env.NAME}`,
      buttons: buttons,
      headerType: 4
  }

 
  this.client.sendMessage(m.from, buttonMessageds, {quoted: m.message,});

// m.reply(txt)
} 
catch (err) {
console.log(err)
return m.reply ('⚠️ Something Went Wrong')
}}

}
