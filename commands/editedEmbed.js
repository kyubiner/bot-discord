const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("editembed")
        .setDescription("Contoh edit embed setelah dikirim"),
    async execute(interaction) {
        const embedAwal = new EmbedBuilder()
            .setTitle("Loading...")
            .setColor("Yellow");

        // Kirim embed awal
        const message = await interaction.reply({
            embeds: [embedAwal],
            fetchReply: true,
        });

        // Simulasi delay 3 detik
        setTimeout(() => {
            const embedBaru = new EmbedBuilder()
                .setTitle("Sudah diperbarui!")
                .setDescription("Ini embed setelah diedit.")
                .setColor("Green");

            message.edit({ embeds: [embedBaru] });
        }, 3000);
    },
};
