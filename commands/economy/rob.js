const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports = {
  config: {
    name: "rob",
    noalias: [""],
    category: "economy",
    description: "Voler quelqu'un",
    usage: "[username | nickname | mention | ID]",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    if (!args[0]) return message.channel.send("**Entrez un nom!**")  
    let user2 = message.author

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase());
    if (!user) return message.channel.send("**Entrez un utilisateur valide !**")

    let embed2 = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Vous ne pouvez pas vous voler`)

    if (user.user.id === message.author.id) {
      return message.channel.send(embed2)
    }

    let targetuser = await db.fetch(`money_${user.id}`)
    let author = await db.fetch(`rob_${user.id}`)
    let author2 = await db.fetch(`money_${user2.id}`)

    let timeout = 600000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));

      let timeEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ Vous avez déjà cambriolé quelqu'un\et réessayez dans ${time.minutes}m ${time.seconds}s `);
      message.channel.send(timeEmbed)
    } else {

      let moneyEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ Vous avez besoin d'au moins 100 pièces dans votre portefeuille pour voler quelqu'un`);

      if (author2 < 100) {
        return message.channel.send(moneyEmbed)

      }
      let moneyEmbed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ ${user.user.username} n'a rien à voler`);

      let random = Math.floor((Math.random() * 100)) + 1;

      if (targetuser < random) {
        return message.channel.send(moneyEmbed2)
      } else {

        let embed = new MessageEmbed()
          .setDescription(`✅ Vous avez volé ${user.user.username} et vous êtes enfui avec ${random} coins`)
          .setColor("GREEN")
        message.channel.send(embed)

        db.subtract(`money_${user.id}`, random)
        db.add(`money_${user2.id}`, random)
        db.set(`rob_${user.id}`, Date.now())

      }
    };
  }
} 