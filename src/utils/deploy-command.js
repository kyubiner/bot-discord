const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const commands = [];

const foldersPath = path.join(__dirname, '..', 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(foldersPath, file));
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST().setToken(process.env.TOKEN);

async function deployCommands() {
    try {
        console.log(`⏳ Refreshing ${commands.length} application (/) commands...`);
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );
        console.log('✅ Successfully reloaded application (/) commands.');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = { deployCommands };
