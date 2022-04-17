const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "getinvite",
        aliases: ['inv'],
        category: "info",
        description: "Invitez Ussop",
        usage: " ",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

        let channelembed = new MessageEmbed()
            .setTitle(`**Lien pour inviter Ussop**`)
            .setThumbnail(message.guild.iconURL())
            .setDescription('https://discord.com/oauth2/authorize?client_id=961536715774894130&scope=bot&permissions=29867910398')
            .setFooter(message.member.displayName,
                       message.author.displayAvatarURL())
            .setTimestamp()
            .setColor("RED")
        message.channel.send(channelembed);
    }
}