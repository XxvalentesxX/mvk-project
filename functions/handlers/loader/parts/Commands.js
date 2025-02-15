const fs = require('fs');
const path = require('path');
const { newCommand, handleCommand, getCommands } = require('../../add-ons/SetCommand');
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

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    try {
      const commands = getCommands();

      let foundCommand = null;
      let dynamicKey = null;
      let dynamicValue = null;

      for (const cmd of commands) {
        if (cmd.name.includes('{')) {
          const matchVar = cmd.name.match(/{(\w+)}/);
          if (!matchVar) continue;

          dynamicKey = matchVar[1];
          const regex = new RegExp(`^${cmd.name.replace(/{\w+}/, '(\\w+)')}$`);
          const match = commandName.match(regex);

          if (match) {
            foundCommand = cmd;
            dynamicValue = match[1];
            break;
          }
        } else if (cmd.name.toLowerCase() === commandName) {
          foundCommand = cmd;
          break;
        }
      }

      if (!foundCommand) return;

      const argsObject = dynamicKey ? { [dynamicKey]: dynamicValue } : {};
      await foundCommand.code(message, args, argsObject);
    } catch (error) {
      console.error('Error handling command:', error);
    }
  });

  return results;
}

module.exports = Commands;
