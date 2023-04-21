const Command = require('../../Structures/Command');
const Message = require('../../Structures/Message');

module.exports = class ResetBanCommand extends Command {
    constructor() {
        super('resetban', {
            description: 'Unban all users who were previously banned',
            category: 'dev',
            cooldown: 5
        });
    }

    /**
     * @param {Message} m
     * @param {import('../../Handlers/Message').args} args
     * @returns {Promise<void>}
     */
    execute = async (m, args) => {
        const bannedUsers = await this.helper.DB.user.find({ ban: true }).select('jid');
        if (!bannedUsers || !bannedUsers.length) {
            return void m.reply('No banned users found.');
        }

        for (const { jid } of bannedUsers) {
            await this.helper.DB.user.updateOne({ jid }, { $set: { ban: false } });
        }

        return void m.reply(`Unbanned ${bannedUsers.length} user${bannedUsers.length > 1 ? 's' : ''}.`);
    }
}
