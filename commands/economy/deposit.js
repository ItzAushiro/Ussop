const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "deposit",
        aliases: ["dep"],
        category: "economy",
        description: "Dépose de l'argent à la banque",
        usage: "<montant>",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {

        let user = message.author;

        let member = db.fetch(`money_${user.id}`)

        if (args[0] == 'all') {
            let money = await db.fetch(`money_${user.id}`)

            let embedbank = new MessageEmbed()
                .setColor('GREEN')
                .setDescription("❌ Vous n'avez pas d'argent à déposer")

            if (!money) return message.channel.send(embedbank)

            db.subtract(`money_${user.id}`, money)
            db.add(`bank_${user.id}`, money)
            let sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vous avez déposé toutes vos pièces dans votre banque`);
            message.channel.send(sembed)

        } else {

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Spécifiez un montant à déposer`);

            if (!args[0]) {
                return message.channel.send(embed2)
                    .catch(err => message.channel.send(err.message))
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Votre montant n'est pas un chiffre !`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous ne pouvez pas déposer d'argent négatif`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous n'avez pas beaucoup d'argent`);

            if (member < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vous avez déposé ${args[0]} pièces dans votre banque`);

            message.channel.send(embed5)
            db.subtract(`money_${user.id}`, args[0])
            db.add(`bank_${user.id}`, args[0])

        }
    }
}