require('dotenv').config();
const { Client, IntentsBitField, ActivityType, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.warn(`[WARNING] Command di ${filePath} tidak valid`);
    }
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Ada error saat menjalankan command!', ephemeral: true });
    }
});

client.on('ready', (c) => {
    console.log(`hey ${c.user.tag} is online.`);

    client.user.setActivity({
        name: 'Minecraft the movie',
        type: ActivityType.Watching
    });
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }

    if (message.content === 'hai') {
        message.reply('hai juga bang 👋');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'lanjut') {
        await interaction.reply({ content: 'Tombol diklik!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);
// cara ngidupin bot "nodemon src/index.js"