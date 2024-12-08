const { sendMessage } = require("./functions/miscelaneos/sendMessage");
const banUser = require("./functions/moderation/banUser");
const { jsonClear, jsonExists, jsonSet, jsonParse, jsonPretty, jsonStringify, jsonUnset, json } = require("./functions/utils/jsonFunctions");
const checkContains = require('./functions/utils/checkContains');
const { checkUserPerms } = require('./functions/utils/checkPermissions');
const { getMessageContent, stop }= require('./functions/utils/stopAndMessage');
const loop = require('./functions/utils/loop');
const { newCommand } = require('./functions/manage_commands/newCommand');
const { subCommand, newSlashCommand, slashOption } = require("./functions/manage_commands/slashCommands");
const embedCreate = require('./functions/utils/embedCreate');
const timeoutUser = require("./functions/moderation/timeout");
const { splitText, textSplit, getTextSplitLength } = require("./functions/utils/splits");
const { newEvent } = require("./functions/manage_commands/newEvents");
const { createChannel } = require("./functions/administration/createChannel");
const { startBot } = require('./functions/startBot');
const addRole = require('./functions/administration/addRole');
const removeRole = require('./functions/administration/removeRole');
const changeNick = require('./functions/moderation/changeNick');
const addReactions = require('./functions/miscelaneos/addReactions');
const unbanUser = require('./functions/moderation/unbanUser');
const setPresence = require('./functions/setPresence');
const Var = require('./functions/miscelaneos/variables');
const Component = require('./functions/manage_commands/Components');
const Load = require('./functions/handlers/Load');

module.exports = {
    sendMessage,
    embedCreate,
    banUser,
    jsonClear,
    jsonExists,
    jsonSet,
    jsonParse,
    jsonPretty,
    jsonStringify,
    jsonUnset,
    json,
    checkContains,
    checkUserPerms,
    getMessageContent,
    stop,
    loop,
    subCommand,
    newSlashCommand,
    newCommand,
    timeoutUser,
    splitText,
    textSplit,
    getTextSplitLength,
    slashOption,
    newEvent,
    createChannel,
    startBot,
    addRole,
    removeRole,
    changeNick,
    addReactions,
    unbanUser,
    setPresence,
    Var,
    Component,
    Load
};
