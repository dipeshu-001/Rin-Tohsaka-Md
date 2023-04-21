const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const YT = require("../../lib/yt");
const fs = require("fs");
const yts = require("youtube-yts");
const fetch = require("node-fetch");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);
module.exports = class command extends Command {
    constructor() {
        super('play', {
            description: 'To download a song as mp3 from YouTube link or just by search',
            usage: 'play [song name] | play [youtuvbe video link]',
            category: 'Media',
            exp: 20,
            aliases: ['yta'],
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
        if (!context === null)
      return this.client.sendMessage(
        m.from,
        { text: `❌ No Link Provided!` },
        { quoted: m.message }
      );
      const songSerachTerm = context
    const songInfo = await yts(songSerachTerm);
    const song = songInfo.videos[0];
    let videoUrl = song.url;
    let videoId = videoUrl.split("v=")[1];

    yts({ videoId }).then((result) => {
      YT.mp3(videoId).then((file) => {
        const inputPath = file.path;
        const outputPath = inputPath + ".opus";

        ffmpeg(inputPath)
          .format("opus")
          .on("error", (err) => {
            console.error("Error converting to opus:", err);
          })
          .on("end", async () => {
            const thumbnailBuffer = await this.helper.utils.getBuffer(song.thumbnail);
            
            this.client.sendMessage(
              m.from,
              {
                audio: fs.readFileSync(outputPath),
                mimetype: "audio/ogg; codecs=opus",
                ptt: true,
                contextInfo: {
                  externalAdReply: {
                    title: song.title.substr(0, 30),
                    body: song.description.substr(0, 30),
                    mediaType: 2,
                    thumbnail: thumbnailBuffer,
                    mediaUrl: song.url
                  }
                }
              },
              { quoted: m.message }
            );
            
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
          })
          
          
          .save(outputPath);
      });
    });
  }
};