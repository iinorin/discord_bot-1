const { EmbedBuilder } = require('discord.js');


module.exports = (message) => {
    if (message.content === "Ino inori") {
        const embed = new EmbedBuilder()

            .setTitle('I am Inori')
            .setDescription('I work For Funeral Parlour')
            .setColor('Random')
            .setAuthor({ name: 'Invite Link', iconURL: process.env.INORITHUMB, url: process.env.BOTINVURL })
            .setThumbnail(process.env.INORITHUMB)
            .setImage(process.env.INOCCGIF)
            .setURL(process.env.BOTINVURL)
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setTimestamp()
            .setFooter({ text: 'Made by Misaka', iconURL: process.env.INORITHUMV });

        message.channel.send({ embeds: [embed] });
    }

    if (message.content === "Ino miku") {
        const embed = new EmbedBuilder()

            .setTitle('I am miku')
            .setDescription('I am working from home')
            .setColor('Random')
            // .setAuthor({ name: 'Invite Link', iconURL: process.env.INORITHUMB, url: process.env.BOTINVURL })
            .setThumbnail('https://i.pinimg.com/originals/3d/0b/c3/3d0bc327b2fa3853f5d73d2889f4c7ad.gif')
            .setImage('https://i.pinimg.com/originals/3d/0b/c3/3d0bc327b2fa3853f5d73d2889f4c7ad.gif')
            .setURL(process.env.BOTINVURL)
            .addFields(
                { name: 'About', value: 'I am currently with Loli Spade' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setTimestamp()
            .setFooter({ text: 'Made by Misaka', iconURL: process.env.INORITHUMV });

        message.channel.send({ embeds: [embed] });
    }
};