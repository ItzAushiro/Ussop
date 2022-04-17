const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config');
const db = require('quick.db');

module.exports = {
    config: {
        name: "store",
        noalias: [""],
        category: "economy",
        description: "Affiche la liste des éléments",
        usage: " ",
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
      
        let embed = new MessageEmbed()
            .setDescription(`**Rangs VIP**\n\nBronze : 200 pièces [${prefix}buy/${prefix}sell bronze]\n\n**Articles de style de vie**\n\nNikes fraîches : 600 [${prefix}buy/$ {prefix}sell nikes]\nVoiture : 800 [${prefix}buy/${prefix}sell car]\nManoir : 1 200 [${prefix}buy/${prefix}sell mansion]`)
            .setColor("GREEN")
        message.channel.send(embed)
    }
}