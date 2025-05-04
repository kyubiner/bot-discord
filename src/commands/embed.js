const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Buat embed dengan input manual")
        .addStringOption((option) =>
            option.setName("title").setDescription("Judul embed").setRequired(true)
        )
        .addStringOption((option) =>
            option.setName("desc").setDescription("Deskripsi embed").setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription("Warna HEX (contoh: #ff0000)")
                .setRequired(false)
        ),

    async execute(interaction) {
        const title = interaction.options.getString("title");
        const desc = interaction.options.getString("desc");
        let color = interaction.options.getString("color");

        // Validasi warna
        if (color && /^#?[0-9A-Fa-f]{6}$/.test(color)) {
            if (!color.startsWith("#")) color = `#${color}`;
        } else {
            color = "#3498db"; // default: biru
        }

        const embed = {
            title: title,
            description: desc,
            color: parseInt(color.replace("#", ""), 16),
        };

        await interaction.reply({content: "embed berhasil terkirim",ephemeral: true});
        const channel = interaction.channel;
        channel.send({ embeds: [embed] });
    },
};
