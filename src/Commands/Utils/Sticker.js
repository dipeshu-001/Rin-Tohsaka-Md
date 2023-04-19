const { Sticker, StickerTypes } = require('wa-sticker-formatter')
const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('sticker', {
            description: 'Converts image/video/gif to sticker',
            category: 'utils',
            usage: 'sticker [caption/quote message containing media] [options] | <pack> | <author>',
            aliases: ['s'],
            cooldown: 10
        })
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        if (!m.hasSupportedMediaMessage && !m.quoted?.hasSupportedMediaMessage)
            return void m.reply('Provide an image/gif/video by captioning it as a message or by quoting it')
        let buffer
        if (m.hasSupportedMediaMessage) buffer = await m.downloadMediaMessage(m.message.message)
        else if (m.quoted && m.quoted.hasSupportedMediaMessage) buffer = await m.downloadMediaMessage(M.quoted.message)
        let { flags, context } = args
        flags.forEach((flag) => (context = context.replace(flag, '')))
        const numbersFlag = this.helper.utils
            .extractNumbers(flags.join(' ').replace(/\--/g, ''))
            .filter((number) => number > 0 && number <= 100)
        const quality =
            numbersFlag[0] || this.getQualityFromType(flags.filter((flag) => this.qualityTypes.includes(flag))) || 50
        const categories = this.getStickerEmojisFromCategories(flags)
        const pack = context.split('|')
        const sticker = new Sticker(buffer, {
            categories,
            pack: pack[1] ? pack[1].trim() : '☘️ Handcrafted for you by',
            author: pack[2] ? pack[2].trim() : `Jill_Botto ☘️`,
            quality,
            type:
                flags.includes('--c') || flags.includes('--crop') || flags.includes('--cropped')
                    ? 'crop'
                    : flags.includes('--s') || flags.includes('--stretch') || flags.includes('--stretched')
                    ? 'default'
                    : flags.includes('--circle') ||
                      flags.includes('--r') | flags.includes('--round') ||
                      flags.includes('--rounded')
                    ? 'circle'
                    : 'full'
        })
        return void (await m.reply(await sticker.build(), 'sticker'))
    }

    /**
     * @private
     */

    qualityTypes = ['--low', '--broke', '--medium', '--high']

    /**
     * @private
     * @param {('--low' | '--broke' | '--medium' | '--high')[]} types
     * @returns {number | undefined}
     */

    getQualityFromType = (types) => {
        if (!types[0]) return
        for (const type of types) {
            switch (type) {
                case '--broke':
                    return 1
                case '--low':
                    return 10
                case '--medium':
                    return 50
                case '--high':
                    return 100
            }
        }
    }

    /**
     * @private
     * @param {string[]} flags
     * @returns {import('wa-sticker-formatter').Categories[]}
     */

    getStickerEmojisFromCategories = (flags) => {
        /**@type {import('wa-sticker-formatter').Categories[]} */
        const categories = []
        for (const flag of flags) {
            if (categories.length >= 3) return categories
            switch (flag) {
                case '--angry':
                    categories.push('💢')
                    break
                case '--happy':
                    categories.push('😄')
                    break
                case '--sad':
                    categories.push('😭')
                    break
                case '--love':
                    categories.push('❤️')
                    break
                case '--celebrate':
                    categories.push('🎉')
                    break
                case '--greet':
                    categories.push('👋')
                    break
            }
        }
        if (categories.length < 1) categories.push('✨', '💗')
        return categories
    }
}
