
const Message = require('../../Structures/Message')

const ms = require('moment-timezone')

const Command = require('../../Structures/Command')

const percentageCal = (partialValue, totalValue) => {

    const percentage = (100 * partialValue) / totalValue

    return Math.round(percentage)

}

const reward = (level) => {

    return {

        reward: {

            trash: Math.round(Math.random() * 5) * level,

            potion: Math.round(Math.random() * 2) * level,

            wood: Math.round(Math.random() * 8) * level,

            string: Math.round(Math.random() * 8) * level,

            iron: Math.round(Math.random() * 5) * level,

            gold: Math.round(Math.random() * 3) * level,

            diamond: Math.round(Math.random() * 2) * level

    }
  }
}

module.exports = class command extends Command {

    constructor() {

        super('adventure', {

            description: "Displays the bot's usable commands",

            category: 'rpg',

            exp: 20,

            usage: 'adventure',

            aliases: ['adventure'],

            cooldown: 10

        })

    }

  /**

  * @param {Message} m

  * @param {import('../../Handlers/Message').args} args

  * @returns {Promise<void>}

  */


 execute = async (client, arg, m) => {
 
 
  

           const cooldown = 300000

        const lastadvn = await client.DB.get(`${m.sender}.adventure`)

        if (lastadvn !== null && cooldown - (Date.now() - lastadvn) > 0) {

            const lastadvntime = ms(cooldown - (Date.now() - lastadvn))

            return m.reply(

                `*You have to wait ${lastadvntime.minutes} minute(s), ${lastadvntime.seconds} second(s) for another hunt*`

            )

        }

        const level = (await client.DB.get(`${m.sender}_LEVEL`)) || 1

        const health = (await client.rpg.get(`${m.sender}.health`)) || 100

        const armor = await client.rpg.get(`${m.sender}.armor.durability`)

        const sword = await client.rpg.get(`${m.sender}.sword.durability`)

        if (!armor) return m.reply(`*You dont have any armor!!*`)

        if (!sword) return m.reply(`*You dont have a sword!!*`)

        if (health < 30) return m.reply(`*You dont have the required health ❤️*`)

        await helper.DB.set(`${m.sender}.adventure`, Date.now())

        m.reply(

            `*You have _Health: ${percentageCal(10, health)}_ ❤️ reduction and your armor and sword got ${percentageCal(

                30,

                armor

            )}, ${percentageCal(5, sword)} respectively damage*`

        )

        await client.rpg.sub(`${m.sender}.armor.durability`, percentageCal(30, armor))

        await client.rpg.set(`${m.sender}.health`, health - percentageCal(10, health))

        await client.rpg.sub(`${m.sender}.sword.durability`, percentageCal(5, sword))

        let text = '🔖 *Adventure Rewards:*\n\n'

        for (const rewardItem in reward(level).reward) {

            await client.rpg.add(`${m.sender}[${rewardItem}]`, reward(level).reward[rewardItem])

            text += `*> ${rewardItem}: _${reward(level).reward[rewardItem]}_*\n`

        }

        setTimeout(() => {

            m.reply(text)

        }, 10000)

    }

}

    

