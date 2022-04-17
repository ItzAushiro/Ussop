const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "addmoney",
        aliases: ["am"],
        category: "economy",
        description: "Ajoute de l'argent à un utilisateur",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("❌ Vous n'êtes pas autorisé à ajouter de l'argent ! - [ADMINISTRATEUR]");
        if (!args[0]) return message.channel.send("**Veuillez entrer un utilisateur !**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
if (!user) return message.channel.send("**Entrez un utilisateur valide !**")
         if (!args[1]) return message.channel.send("**Veuillez entrer un montant !**")
if (isNaN(args[1])) return message.channel.send(`**❌Votre montant n'est pas un nombre !**`);
         if (args[0] > 10000) return message.channel.send("**Impossible d'ajouter autant de montant !**")
        db.add(`money_${user.id}`, args[1])
        let bal = db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Ajoutée ${args[1]} pièces\n\Nouveau solde: ${bal}`);
        message.channel.send(moneyEmbed)

    }
}