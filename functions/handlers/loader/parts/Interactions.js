const fs = require('fs');
const path = require('path');

async function Interactions(directory, client) {
  const dirPath = path.resolve(directory);

  const results = {
    loaded: [],
    errors: []
  };

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'buttons'), { recursive: true });
    fs.mkdirSync(path.join(dirPath, 'menus'), { recursive: true });
  }

  const loadFiles = (subDir, type) => {
    const files = fs.readdirSync(subDir).filter((file) => file.endsWith('.js'));

    files.forEach((file) => {
      const filePath = path.join(subDir, file);

      try {
        const interaction = require(path.resolve(filePath));

        if (interaction && typeof interaction.code === 'function') {
          client.on('interactionCreate', async (interactionInstance) => {
            try {
              const customId = interactionInstance.customId;
              const match = matchCustomId(interaction.id, customId);

              if (match) {
                await interaction.code(interactionInstance, match);
              }
            } catch (error) {
              console.error(`Error handling interaction: ${interactionInstance.customId}`, error);
              results.errors.push({ file: filePath, error: error.message });
            }
          });

          results.loaded.push({
            file: file,
            type: type
          });
        }
      } catch (error) {
        console.error(`Error loading interaction from ${filePath}:`, error);
        results.errors.push({ file: filePath, error: error.message });
      }
    });
  };

  ['buttons', 'menus'].forEach((subFolder) => {
    const subDir = path.join(dirPath, subFolder);
    if (fs.existsSync(subDir)) {
      loadFiles(subDir, subFolder);
    }
  });

  return results;
}

/**
 * Función para hacer match entre la ID del botón y una interacción recibida
 * Ejemplo: 
 * - ID Config: "id-{user}"
 * - ID Recibida: "id-11841284218"
 * - Retorna: { user: "11841284218" }
 */
function matchCustomId(configId, receivedId) {
  const pattern = configId.replace(/{(\w+)}/g, '(?<$1>[^-]+)');
  const regex = new RegExp(`^${pattern}$`);
  const match = receivedId.match(regex);

  return match ? match.groups : null;
}

module.exports = Interactions;
