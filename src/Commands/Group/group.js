const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
// const { chat } = require('../../lib/openAi')
module.exports = class command extends Command {
    constructor() {
        super('group', {
            description: 'Demote admin',
            category: 'group',
            usage: 'demote [@mention]',
            exp: 15,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @returns {Promise<void>}
     */

    execute = async (m , args) => {

        const groupMetadata = await this.client.groupMetadata(m.from)
        const groupAdmins = groupMetadata.participants.filter((x) => x.admin).map((x) => x.id)
        const botNumber = await this.client.decodeJid(this.client.user.id);
        const isBotAdmin =  groupAdmins.includes(botNumber)
        const isAdmin = groupAdmins.includes(m.sender.jid)
        if(!isAdmin) return m.reply('User should be admin')
        if(!isBotAdmin) return m.reply('Bot should be admin')

        let {context} = args;
if (context === 'open'){
    await this.client.groupSettingUpdate(m.from, 'not_announcement').then((res) => m.reply(`*Group open*`)).catch((err) => m.reply(jsonformat(err)))
 } else if (context === 'close'){
    await this.client.groupSettingUpdate(m.from, 'announcement').then((res) => m.reply(`*Group closed*`)).catch((err) => m.reply(jsonformat(err)))
 } else {
    let buttons = [
        {
            buttonId: `cos`,
            buttonText: {
              displayText: `${process.env.PREFIX}group close`,
            },
            type: 1,
          },
          {
            buttonId: `close`,
            buttonText: {
              displayText: `${process.env.PREFIX}group open`,
            },
            type: 2,
          },
      ];

      let buttonMessageds = {
          image: {url:"https://www.shutterstock.com/image-illustration/open-closed-road-signs-construction-260nw-590901248.jpg"},
          caption: `Choose the required setting` ,
          footer: `Group Settings`,
          buttons: buttons,
          headerType: 4
      }
  
     
      this.client.sendMessage(m.from, buttonMessageds, {quoted: m.message,});
    }

}
}
