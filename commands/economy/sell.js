const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { PREFIX } = require('../../config')

module.exports = {
    config: {
        name: "sell",
        noalias: [""],
        category: "economy",
        description: "Vendre à quelqu'un",
        usage: "[mention | ID] <montant>",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        let user = message.author;

        if (args.join(' ').toLocaleLowerCase() == 'nikes') {
            let embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous n'avez pas de Nikes à vendre`);

            let nikees = await db.fetch(`nikes_${user.id}`)

            if (nikees < 1) return message.channel.send(embed1)

            db.fetch(`nikes_${user.id}`)
            db.subtract(`nikes_${user.id}`, 1)

            let embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vendu des Nikes fraîches pour 600 pièces`);

            db.add(`money_${user.id}`, 600)
            message.channel.send(embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'car') {
            let embed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous n'avez pas de Voiture à vendre`);

            let cars = await db.fetch(`car_${user.id}`)

            if (cars < 1) return message.channel.send(embed3)

            db.fetch(`car_${user.id}`)
            db.subtract(`car_${user.id}`, 1)

            let embed4= new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vendu une voiture pour 800 pièces`);

            db.add(`money_${user.id}`, 800)
            message.channel.send(embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ Vous n'avez pas de Manoir à vendre`);

            let houses = await db.fetch(`house_${user.id}`)

            if (houses < 1) return message.channel.send(sembed2)

            db.fetch(`house_${user.id}`)
            db.subtract(`house_${user.id}`, 1)

            let sembed3 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Vendu un manoir pour 1200 pièces`);

            db.add(`money_${user.id}`, 1200)
            message.channel.send(sembed3)
        } else {
            if (message.content.toLowerCase() === `${prefix}sell`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Entrez un article à vendre. Tapez ${prefix}store pour voir la liste des articles`)
                return message.channel.send(embed9)
            } else {
              return message.channel.send("** Pas un article valide ! **")
            }
        }
    }
}