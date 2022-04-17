const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    config: {
        name: "meme",
        category: "fun",
        noalias: "No Aliases",
        usage: " ",
        description: "Envoie un mème épique",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle("Meme!")
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}
