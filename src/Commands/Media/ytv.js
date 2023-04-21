const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const YT = require("../../lib/yt");
const yts = require("youtube-yts");

module.exports = class command extends Command {
    constructor() {
        super('playv', {
            description: 'To download a song as mp3 from YouTube link or just by search',
            usage: 'play [song name] | play [youtuvbe video link]',
            category: 'Media',
            aliases: ['ytv'],
            exp: 20,
            dm: false,
            cooldown: 50
        })
    }

    /**
     * @param {Message} m
     * @param {args} args
     * @returns {Promise<void>}
     */

    execute = async (m, args) => {
        let {context} = args
        try {
    if (!context === 0)
      return this.client.sendMessage(
        m.from,
        { text: `❌ Please provide a video title to play !` },
        { quoted: m.message }
      );
    const songSearchTerm = context
    const songInfo = await yts(songSearchTerm);
    const song = songInfo.videos[0];
    let videoUrl = song.url;
    let videoId = videoUrl.split("v=")[1];

    await this.client.sendMessage(
      m.from,
      {
        image: { url: song.thumbnail },
        caption: `*🔥Title name :* _${song.title}_\n\n*⌛Duration :* _${song.timestamp}_\n\n*🔗Url :* _${song.url}_\n\n\n_*Downloading Video...*_\n\n`,
      },
      { quoted: m.message }
    );

    const result = await yts(videoId);
    const length = result.seconds;

    if (length >= 1800) {
      return m.reply(
        "Command Rejected! The audio is more than 30 minutes long! "
      );
    } else {
      const ytaud = await YT.mp4(videoUrl);
      this.client.sendMessage(
        m.from,
        {
          video: { url: ytaud.videoUrl },
          caption:`${song.title}`,
        },
        { quoted: m.message }
      );
    }
  } catch (err) {
    console.error(err);
    this.client.sendMessage(
      m.from,
      { text: `Failed to play the song: ${err.message}` },
      { quoted: m.message }
    );
  }
}
};
