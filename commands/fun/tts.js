const request = require("node-superfetch");

module.exports = {
  config: {
    name: "tts",
    aliases: ["texttospeech"],
    category: "fun",
    usage: "Convertit le texte en parole",
    description: "Convertir le texte en parole",
    accessableby: "everyone"
  },
  run: async (bot, message, args, ops) => {
    if (!args[0])
      return message.channel.send(
        "**Veuillez entrer quelque chose à convertir en parole !**"
      );
    let text = args.join(" ");
    let serverQueue = ops.queue.get(message.guild.id)
    if (text.length > 1024)
      return message.channel.send(
        "**Veuillez entrer du texte entre 0 et 1024 caractères !**"
      );
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.channel.send("**Veuillez d'abord rejoindre un canal vocal ! **");
    if (
      !voiceChannel
        .permissionsFor(message.client.user)
        .has(["CONNECT", "SPEAK"])
    ) {
      return message.channel.send(
        "**Autorisations manquantes pour le canal vocal ! - [CONNECT, SPEAK]**"
      );
    }
    if (serverQueue) return message.channel.send("**Impossible de lire TTS pendant la lecture de la musique !**")
    if (!voiceChannel.joinable)
      return message.channel.send("**Impossible de rejoindre le canal vocal ! **");
    if (bot.voice.connections.has(voiceChannel.guild.id))
      return message.channel.send("**Je suis déjà en train de convertir TTS !**");
    try {
      const connection = await voiceChannel.join();
      const { url } = await request
        .get("http://tts.cyzon.us/tts")
        .query({ text });
      const dispatcher = connection.play(url);
      await message.react("🔉");
      dispatcher.once("finish", () => voiceChannel.leave());
      dispatcher.once("error", () => voiceChannel.leave());
      return null;
    } catch (err) {
      voiceChannel.leave();
      console.log(err)
      return message.channel.send(
        `**Oh non, une erreur s'est produite : réessayez plus tard!**`
      );
    }
  }
};
