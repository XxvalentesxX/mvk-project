const { sendMessage } = require("./functions/Message/Send");
const checkContains = require('./functions/Message/checkContains');
const { startBot } = require('./functions/client/startBot');

const { Set, Add, Create, Remove, User, Loop, Message, Buttons } = require('./functions/classes')
const Var = require('./functions/misc/Var');
const Load = require('./functions/handlers/loader/Load');
const { Menus } = require("./functions/Message/Components/Menus");
const Embed = require("./functions/Message/Embed");

module.exports = {
    sendMessage,
    checkContains,
    startBot,
    Set,
    Add,
    Create,
    Remove,
    User,
    Loop,
    Message,
    Var,
    Load,
    Buttons,
    Menus,
    Embed
};
