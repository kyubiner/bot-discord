const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Bot berbicara")
        .addStringOption((option) =>
            option.setName("word").setDescription("Masukan huruf").setRequired(true)
        ),
    async execute(interaction) {
        const word = interaction.options.getString("word");
        await interaction.reply({ content: "Berhasil terkirim", ephemeral: true});
        const channel = interaction.channel;
        channel.send(word);
    },
};