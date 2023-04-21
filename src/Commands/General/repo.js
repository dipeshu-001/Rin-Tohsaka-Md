const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const axios = require('axios')
module.exports = class command extends Command {
    constructor() {
        super('repo', {
            description: "Displays the bot's repo",
            category: 'general',
            exp: 20,
            usage: 'repo',
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
            try {
                let repoInfo = await axios.get('https://api.github.com/repos/Eximinati/Ari-Ani')
                if (!repoInfo) {
                    return void m.reply('Failed to fetch repo information.');
                }
                let repo = repoInfo.data
                let txt = `       🧣 *${process.env.NAME}'s Script* 🧣\n\n*🎀 Total Forks:* ${repo.forks}\n*⭐ Total Stars:* ${repo.stargazers_count}\n*📜 License:* ${repo.license.name}\n*📁 Repo Size:* ${(repo.size/1024).toFixed(2)} MB\n*📅 Last Updated:* ${repo.updated_at}\n\n*🔗 Repo Link:* ${repo.html_url}\n\n❝ Dont forget to give a Star ⭐ to the repo.`
        
                const buttons = [
                    {
                        buttonId: 'id1',
                        buttonText: { displayText: `${process.env.PREFIX}help` },
                        type: 1
                    },
                    {
                        buttonId: 'id2',
                        buttonText: { displayText: `${process.env.PREFIX}support` },
                        type: 1
                    }
                ]
               
                let bufferPromise = this.helper.utils.buffergif("https://telegra.ph/file/20320ee507d8f9f3c260c.mp4")
    // let buffer = await bufferPromise
                let buttonMessage = {
                    video: {url:bufferPromise},
                    caption: txt ,
                    footer: `${process.env.NAME} 2023`,
                    buttons: buttons,
                    headerType: 4,
                    gifPlayback: true
                }
        
                await this.client.sendMessage(m.from, buttonMessage,  {quoted:m.message});
                // await this.client.sendMessage(m.from,{video:{url:"https://telegra.ph/file/20320ee507d8f9f3c260c.mp4"}, caption: txt , gifPlayback:true },  {quoted:m.message});
            } catch (error) {
                console.error(error);
                return void m.reply('Failed to fetch repo information.');
            }
        }
    }
        