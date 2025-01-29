const { sendMessage } = require("./functions/message/Send");
const checkContains = require('./functions/message/checkContains');
const { startBot } = require('./functions/client/startBot');

const { Set, Add, Create, Remove, User, Loop, Message, Buttons } = require('./functions/classes')
const Var = require('./functions/misc/Var');
const Load = require('./functions/handlers/loader/Load');
const { Menus } = require("./functions/message/Components/Menus");
const Embed = require("./functions/message/Embed");

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
