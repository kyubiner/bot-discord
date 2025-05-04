const { SlashCommandBuilder } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quetes")
        .setDescription("Jika kau kurang motivasi aku punya quete untukmu!"),
    async execute(interaction) {
        const quetes = ["Everything feels the same—yet time quietly moves on.\nThe silliness of the past becomes a bridge to the future.\nThe smallest things we do ripple into a reality that matters.\nAnd as darkness fades, the light begins to rise.", "quetes sedang dipikirkan sama connction"];
        const randomIndex = Math.round(Math.random() * 2);
        const button = new ButtonBuilder()
            .setCustomId('lanjut')
            .setLabel('lanjut!')
            .setStyle(ButtonStyle.Primary);
        const row = new ActionRowBuilder().addComponents(button);
        await interaction.reply({
            content: quetes[randomIndex],
            components: [row],
        });
    },
};