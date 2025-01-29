const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand } = require('../../add-ons/SetCommand');
const Var = require('../../../misc/Var');

async function Commands(directory, client) {
  const absolutePath = path.resolve(directory);

  const results = {
    loaded: [],
    errors: []
  };

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
            results.loaded.push(command.name);
          }
        } catch (error) {
          console.error(`Error loading file ${filePath}:`, error);
          results.errors.push({ file: filePath, error: error.message });
        }
      }
    });
  }

  loadFromDir(absolutePath);

  client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    let prefixes = [client.prefix];
    if (Var.Exists({ name: 'prefix' })) {
      const serverPrefixes = Var.Get({ name: 'prefix', type: Var.Type.Server, id: message.guild.id });
      if (Array.isArray(serverPrefixes) && serverPrefixes.length > 0) {
        prefixes = serverPrefixes;
      }
    }

    const prefix = prefixes.find(p => message.content.toLowerCase().startsWith(p.toLowerCase()));
    if (!prefix) return;

    try {
      await handleCommand(message, prefix);
    } catch (error) {
      console.error('Error handling command:', error);
    }
  });

  return results;
}

module.exports = Commands;
