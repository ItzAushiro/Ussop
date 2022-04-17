const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { PREFIX } = require('../../config');

module.exports = {
  config: {
    name: "buy",
    noalias: [""],
    category: "economy",
    description: "Achète des articles",
    usage: "[item]",
    accessableby: "everyone"
  },
  run: async (bot, message, args) => {
    let user = message.author;

    let prefix;
    let fetched = await db.fetch(`prefix_${message.guild.id}`);

    if (fetched === null) {
      prefix = PREFIX
    } else {
      prefix = fetched
    }

    let author = db.fetch(`money_${user.id}`)

    let Embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`❌ Vous avez besoin de 200 pièces pour acheter Bronze VIP`);


    if (args.join(' ').toLocaleLowerCase() == 'bronze') {
      if (author < 200) return message.channel.send(Embed)

      await db.fetch(`bronze_${user.id}`);
      db.set(`bronze_${user.id}`, true)

      let Embed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ Acheté Bronze VIP pour 200 pièces`);

      db.subtract(`money_${user.id}`, 200)
      message.channel.send(Embed2)
    } else if (args.join(' ').toLocaleLowerCase() == 'nikes') {
      let Embed3 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ Vous avez besoin de 600 pièces pour acheter des Nikes`);

      if (author < 600) return message.channel.send(Embed3)

      await db.fetch(`nikes_${user.id}`)
      db.add(`nikes_${user.id}`, 1)

      let Embed4 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ Acheté des Nikes fraîches pour 600 pièces`);

      db.subtract(`money_${user.id}`, 600)
      message.channel.send(Embed4)
    } else if (args.join(' ').toLocaleLowerCase() == 'car') {
      let Embed5 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ Vous avez besoin de 800 pièces pour acheter une nouvelle voiture`);

      if (author < 800) return message.channel.send(Embed5)

      await db.fetch(`car_${user.id}`)
      db.add(`car_${user.id}`, 1)

      let Embed6 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ Acheté une nouvelle voiture pour 800 pièces`);

      db.subtract(`de l'argent_${message.guild.id}_${user.id}`, 800)
      message.channel.send(Embed6)
    } else if (args.join(' ').toLocaleLowerCase() == 'chateau') {
      let Embed7 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`❌ Vous avez besoin de 1200 pièces pour acheter un manoir`);

      if (author < 1200) return message.channel.send(Embed7)

      await db.fetch(`house_${user.id}`)
      db.add(`house_${user.id}`, 1)

      let Embed8 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`✅ A acheté un manoir pour 1200 pièces`);

      db.subtract(`money_${user.id}`, 1200)
      message.channel.send(Embed8)
    } else {
      if (message.content.toLowerCase() === `${prefix}buy`) {
        let embed9 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`❌ Entrez un article à acheter !\nTapez ${prefix}store pour voir la liste des articles !`)
        return message.channel.send(embed9)
      }
    }
  }
}