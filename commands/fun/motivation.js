const { MessageEmbed } = require('discord.js');
const jsonQuotes = require('../../JSON/motivational.json')

module.exports = {
    config: {
        name: 'motivation',
        aliases: ['motivate', 'motivational'],
        description: 'Obtenez un devis de motivation aléatoire',
        category: "fun",
        usage: "[username | nickname | mention | ID](facultatif)",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;

        const randomQuote = jsonQuotes.quotes[Math.floor((Math.random() * jsonQuotes.quotes.length))];
        if (!args[0]) {
            const quoteEmbed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setTitle(randomQuote.author)
                .setDescription(randomQuote.text)
                .setColor('GREEN')
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setTimestamp()
            return message.channel.send(quoteEmbed);
        }
         else if (args[0]) {
            const embed = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL())
                .setColor("GREEN")
                .setTitle(`${randomQuote.author} -`)
                .setDescription(`**${randomQuote.text}**\n\nPar ${message.member.displayName} à${member.displayName}`)
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setTimestamp()
            message.channel.send(embed)
        }
    }
};