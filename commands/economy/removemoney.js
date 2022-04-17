const { MessageEmbed }= require("discord.js");
const db = require("quick.db");

module.exports = {
    config: {
        name: "removemoney",
        aliases: ["rm"],
        category: "economy",
        description: "Retire de l'argent à un utilisateur",
        usage: "[ mention | ID]",
        accessableby: "Administrator, Owner"
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")) return message.channel.send("❌ Vous n'avez pas les autorisations pour retirer de l'argent !");
        if (!args[0]) return message.channel.send("**Veuillez saisir un utilisateur !**")

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!user) return message.channel.send("**Entrez un utilisateur valide !**")

        if (!args[1]) return message.channel.send("**Veuillez saisir un montant !**")
        if (isNaN(args[1])) return message.channel.send("**Entrez un montant valide !**");
        let bal = await db.fetch(`money_${user.id}`)

        if (args[0] > bal) return message.channel.send("**Impossible de retirer autant d'argent ! **")
        db.subtract(`money_${user.id}`, args[1])
        let bal2 = await db.fetch(`money_${user.id}`)

        let moneyEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Suppression de ${args[1]} pièces\n\nNouveau solde: ${bal2}`);
        message.channel.send(moneyEmbed)

    }
}