const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
    config: {
        name: "daily",
        aliases: ["day"],
        category: "economy",
        description: "Vous donne 200 par jour",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let timeout = 86400000;
        let amount = 200;

        let daily = await db.fetch(`daily_${user.id}`);

        if (daily !== null && timeout - (Date.now() - daily) > 0) {
            let time = ms(timeout - (Date.now() - daily));

            let timeEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous avez déjà récupéré votre récompense quotidienne\n\nRécupérez-la à nouveau dans ${time.hours}h ${time.minutes}m ${time.seconds}s`);
            message.channel.send(timeEmbed)
        } else {
            let moneyEmbed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vous avez récupéré votre récompense quotidienne de pièces de ${amount}`);
            message.channel.send(moneyEmbed)
            db.add(`money_${user.id}`, amount)
            db.set(`daily_${user.id}`, Date.now())


        }
    }
}
