const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const { chunk } = require('../../functions');

module.exports = {
    config: {
        name: "setinfo",
        aliases: ['setbio'],
        description: "Définir la description du profil",
        category: 'economy',
        usage: '[info]',
        accessableby: 'everyone'
    },
    run: async (bot, message, args) => {
        let user = message.author;
        if (!args[0]) {
            let fetchInfo = await db.fetch(`info_${user.id}`)
            if (fetchInfo) {
                let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor('Les informations sont déjà définies', message.author.displayAvatarURL())
                    .setDescription(`**${fetchInfo}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                return message.channel.send(embed)
            }
        }
        let newInfo = args.join(' ');
        if (!newInfo) return message.channel.send('**Veuillez saisir vos informations!**');
        if (newInfo.length > 165) return message.channel.send(`**Max \`165\` Caractères autorisés !**`);
        let newsInfo = chunk(newInfo, 42).join('\n');
        db.set(`info_${user.id}`, newsInfo);

        let notesEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Votre boîte d'informations a été définie`, message.author.displayAvatarURL())
            .setDescription(newsInfo)
            .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(notesEmbed);
    }
};