const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Menampilkan avatar kamu atau orang lain")
        .addUserOption(option =>
            option.setName("target")
                .setDescription("User yang ingin dilihat avatarnya")
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("target") || interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`Avatar ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor("Random");

        await interaction.reply({
            embeds: [embed]
        });
    },
};