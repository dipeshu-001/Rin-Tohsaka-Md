const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('claim', {
            description: 'claim character',
            category: 'character',
            usage: `claim`,
            cooldown: 5
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        const res = this.handler.charaResponse.get(m.from)
        if (!res) return void m.reply('no chara to claim')
        const { wallet, gallery } = await this.client.DB.getUser(m.sender.jid)
        if (res.price > wallet) return void m.reply(`Lol Check your wallet you don't have such gold to claim this`)
        this.handler.charaResponse.delete(m.from)
        await this.client.DB.updateUser(m.sender.jid, 'wallet', 'inc', -res.price)
        gallery.push(res.data)
        await this.helper.DB.user.updateOne(m.sender.jid, 'gallery', 'set', gallery)
        return void m.reply(`You have claimed ${res.data.name}`)
    }
}
