require('dotenv').config();
const { REST, Routes } = require('discord.js');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('⏳ Menghapus semua command (guild)...');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: [] } // Mengosongkan list command
        );

        console.log('✅ Semua guild command berhasil dihapus!');
    } catch (error) {
        console.error(error);
    }
})();