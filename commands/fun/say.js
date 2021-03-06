const { MessageEmbed } = require("discord.js");
const { greenlight } = require("../../JSON/colours.json")

module.exports = {
    config: {
        name: "say",
        category: "fun",
        noalias: [''],
        description: "Dit votre entrée via le bot",
        usage: "[texte]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
      try {
        if (args.length === 0)
            return message.channel.send("**Entrez du texte !**")
        message.delete({ timeout: 1000 })

        const embed = new MessageEmbed()
            .setDescription(args.join(" "))
            .setColor(greenlight);

        message.channel.send(embed)
      } catch (e) {
          throw e;
      };
  }
};
