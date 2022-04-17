const urban = require('relevant-urban');
const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "urbandictionary",
        aliases: ["ud", "urban"],
        category: "fun",
        description: "Donnez des informations sur les mots urbains!",
        usage: "[mot]",
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        if(!args[0])
        return message.channel.send("Veuillez entrer quelque chose à rechercher");

        let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        try {
            let res = await urban(args.join(' '))
                if (!res) return message.channel.send("Aucun résultat trouvé pour ce sujet, désolé !");
                let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

                let embed = new MessageEmbed()
                    .setColor("GREEN")
                    .setAuthor(`Mot - ${word}`)
                    .setThumbnail(image)
                    .setDescription(`**Définition:**\n*${definition || "Aucune définition"}*\n\n**Exemple:**\n*${example || "Aucun Example"}*`)
                    .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
                    .addField("**Lien**",  `[link to ${word}](${urbanURL})`)
                    .addField("**Auteur:**", `${author || "Inconnue"}`)
                    .setTimestamp()

                message.channel.send(embed)
            
        } catch (e) {
            console.log(e)
            return message.channel.send("On dirait que j'ai cassé ! Réessayer")
        }
    }
}