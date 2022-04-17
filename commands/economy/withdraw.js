const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "withdraw",
        aliases: ["wd"],
        category: "economy",
        description: "Retire de l'argent de la banque",
        usage: "<montant>"
    },
    run: async (bot, message, args) => {
        let user = message.author;

        let member2 = db.fetch(`bank_${user.id}`)

        if (args.join(' ').toLocaleLowerCase() == 'all') {
            let money = await db.fetch(`bank_${user.id}`)
            let embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(`❌**Vous n'avez pas d'argent à retirer !**`)
            if (!money) return message.channel.send(embed)
            db.subtract(`bank_${user.id}`, money)
            db.add(`money_${user.id}`, money)
            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vous avez retiré toutes vos pièces de votre banque`); 
            message.channel.send(embed5)

        } else {

            let embed2 = new MessageEmbed() 
                .setColor("GREEN")
                .setDescription(`❌ Précisez un montant à retirer !`);

            if (!args[0]) {
                return message.channel.send(embed2)
            }
            let embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Votre montant n'est pas un chiffre !`)

            if(isNaN(args[0])) {
                return message.channel.send(embed6)
            }
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous ne pouvez pas retirer d'argent négatif !`);

            if (message.content.includes('-')) {
                return message.channel.send(embed3)
            }
            let embed4 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous n'avez pas autant d'argent en banque !`);

            if (member2 < args[0]) {
                return message.channel.send(embed4)
            }

            let embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vous avez retiré ${args[0]} coins de votre banque !`);

            message.channel.send(embed5)
            db.subtract(`bank_${user.id}`, args[0])
            db.add(`money_${user.id}`, args[0])
        }
    }
}