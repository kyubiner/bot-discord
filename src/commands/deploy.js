const { SlashCommandBuilder } = require('discord.js');
const { deployCommand } = require('../utils/deploy-command.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deploy')
        .setDescription('Reload slash commands'),
    async execute(interaction) {
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({ content: 'Kamu tidak punya izin untuk menjalankan ini.', ephemeral: true });
        }

        await interaction.reply({ content: '⏳ Deploying commands...', ephemeral: true });

        const success = await deployCommands();
        if (success) {
            interaction.editReply('✅ Commands berhasil diperbarui.');
        } else {
            interaction.editReply('❌ Gagal deploy. Lihat log untuk detail.');
        }
    },
};
