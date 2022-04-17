const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { PREFIX } = require('../../config')

module.exports = {
    config: {
        name: "setbackground",
        aliases: ['setbg'],
        category: "economy",
        description: 'Définit l"arrière-plan du profil',
        usage: "[télécharger une image]",
        accessableby: 'everyone'
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
        let amount = 250;
        let bal = await db.fetch(`money_${user.id}`)

        let newBg = message.attachments.first()
        let fetchBg = await db.fetch(`bg_${user.id}`);
        if (!newBg) {
            if (fetchBg) {
                return message.channel.send(`**L'arrière-plan du profil est déjà défini comme - \`${fetchBg}\`**`)
            } else {
                return message.channel.send("**Vous devez télécharger l'image pour définir un nouveau fond !**")
            }
        }

        if (bal < amount) return message.channel.send(`**Vous n'avez pas assez d'argent !\nPrix pour modifier l'arrière-plan - ${amount}**`)
        db.subtract(`money_${user.id}`, amount)
        db.set(`bg_${user.id}`, newBg.url)

        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Votre image d'arrière-plan a été définie`, user.displayAvatarURL())
            .setDescription(`**\`${amount}\` A été déduit et l'arrière-plan du profil a été défini\nLien- \`${newBg.url}\`!**`)
            .setFooter(`Pour vérifier le type d'arrière-plan ${prefix}profile`)
        return message.channel.send(embed)
    }
}