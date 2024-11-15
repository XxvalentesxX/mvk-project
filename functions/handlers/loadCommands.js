const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand } = require('../manage_commands/newCommands'); 

function loadCommands(folderPath, client) {
  const absolutePath = path.resolve(folderPath);

  function loadFromDir(dir) {
    if (!fs.existsSync(dir)) {
      console.error(`The directory ${dir} does not exist.`);
      return;
    }

    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        loadFromDir(filePath);
      } else if (file.endsWith('.js')) {
        try {
          const command = require(filePath);

          if (command && typeof command === 'object' && command.name) {
            newCommand(command);
            console.log(`Command loaded: ${command.name}`);
          }
        } catch (error) {
          console.error(`Error loading file ${filePath}:`, error);
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.on('messageCreate', async (message) => {
    if (!message.content.toLowerCase().startsWith(client.prefix.toLowerCase()) || message.author.bot) return;

    try {
      await handleCommand(message);
    } catch (error) {
      console.error('Error handling command:', error);
    }
  });
}

module.exports = loadCommands;
