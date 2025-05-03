const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info-gempa")
        .setDescription("Menampilkan info gempa terbaru"),
    async execute(interaction) {
        await interaction.reply("Sedang dikerjakan!");
    },
};