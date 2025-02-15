const commands = new Map();

function newCommand(command) {
  if (!command.name) return console.error('Error: El comando debe tener un nombre.');
  
  commands.set(command.name, command);
}

async function handleCommand(message, prefix) {
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  let foundCommand = null;
  let dynamicValue = null;
  let dynamicKey = null;

  for (const [name, cmd] of commands) {
    if (name.includes('{')) {
      const regex = new RegExp(`^${name.replace(/{(\w+)}/, '(\\w+)')}$`);
      const match = commandName.match(regex);

      if (match) {
        foundCommand = cmd;
        dynamicKey = name.match(/{(\w+)}/)[1];
        dynamicValue = match[1];
        break;
      }
    } else if (name.toLowerCase() === commandName) {
      foundCommand = cmd;
      break;
    }
  }

  if (!foundCommand) return;

  try {
    if (dynamicKey && dynamicValue) {
      await foundCommand.code(message, {}, { [dynamicKey]: dynamicValue });
    } else {
      await foundCommand.code(message, {});
    }
  } catch (error) {
    console.error(`Error ejecutando el comando "${foundCommand.name}":`, error);
  }
}

function getCommands() {
  return [...commands.values()];
}

module.exports = { newCommand, handleCommand, getCommands, commands };
