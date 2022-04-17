const fishes = require('../../JSON/fishes.json');
let db = require('quick.db');
const ms = require("parse-ms");
const { randomRange } = require('../../functions');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: 'fish',
        aliases: ['catchfish'],
        category: 'economy',
        description: 'Attrapez un poisson dans un vaste océan',
        usage: '[liste | récompenses] (facultatif)',
        acessableby: 'everyone'
    },
    run: async (bot, message, args) => {

        let user = message.author;

        let bal = db.fetch(`money_${user.id}`)

        let fish = await db.fetch(`fish_${user.id}`)
        if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;

            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;
            if (fishID < 5) rarity = 'junk';
            else if (fishID < 8) rarity = 'common';
            else if (fishID < 9) rarity = 'uncommon';
            else if (fishID < 10) rarity = 'rare';
            else rarity = 'legendary';
            const fishh = fishes[rarity];
            const worth = randomRange(fishh.min, fishh.max);

            let timeout = 1800000;
            let fishtime = await db.fetch(`fishtime_${user.id}`);

            if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
                let time = ms(timeout - (Date.now() - fishtime));

                let timeEmbed = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Vous avez récemment lancé une ligne\n\nPêchez à nouveau dans ${time.minutes}m ${time.seconds}s `);
                return message.channel.send(timeEmbed)
            }

            let embed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(`**🎣 Vous avez lancé votre ligne et attrapé un ${fish.symbol}, je parie qu'il se vend pour environ ${worth}**!`)
            message.channel.send(embed);

            db.add(`money_${user.id}`, worth);
            db.add(`fish_${user.id}`, 1);
            db.set(`fishtime_${user.id}`, Date.now())
        }
        if (args[0] === 'list' || args[0] === 'rewards') {

            let lEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`Liste des noms de poissons et des récompenses que vous pouvez obtenir`)
                .setDescription(`🔧Junk :: Récompense Max : 5, Récompense Min : 1
🐟Common :: Récompense Max : 25, Récompense Min : 10
🐠Peu fréquent :: Récompense Max : 50, Récompense Min : 18
🦑Rare :: Récompense Max : 75, Récompense Min : 30
🐋 Légendaire :: Récompense Max : 100, Récompense Min : 50
**Toutes les récompenses sont aléatoires de max/min**`)
                .setFooter(message.guild.name, message.guild.iconURL())
            return message.channel.send(lEmbed);
        }
    }
}