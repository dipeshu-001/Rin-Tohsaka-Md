const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')

module.exports = class command extends Command {
    constructor() {
        super('eval', {
            description: 'Evaluates JavaScript',
            dm: true,
            usage: 'eval [JavaScript code]',
            category: 'dev'
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let out
        try {
            const result = eval(args.context)
            out = JSON.stringify(result, null, '\t') || 'Evaluated JavaScript'
        } catch (error) {
            out = error.message
        }
        return void m.reply(out)
    }
}

/**
 * @typedef {import('../../Handlers/Message').args} args
 */
