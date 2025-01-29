const { createChannel } = require("./admin/channels/Create");
const removeRole = require("./admin/roles/Remove");
const addRole = require("./admin/roles/Add");
const addReactions = require("./message/Reactions");
const setPresence = require("./client/setPresence");
const changeNick = require("./User/Moderation/ChangeNick");
const banUser = require("./User/Moderation/Ban");
const unbanUser = require("./User/Moderation/Unban");
const timeoutUser = require("./User/Moderation/Timeout");
const loop = require("./misc/loop");
const { checkUserPerms } = require("./permissions/User/Check");
const { textSplit, splitText, getTextSplitLength } = require("./message/Split");
const checkContains = require("./message/checkContains");
const { EditButton } = require("./message/Components/Buttons/Edit");
const { RemoveButton } = require("./message/Components/Buttons/Remove");
const { Buttons } = require("./message/Components/Buttons/Set");
const userinfo = require("./User/Info");

module.exports = {
    Add: {
        Role: addRole,
        Message: {
            Reactions: addReactions
        }
    },
    Create: {
        Channel: createChannel
    },
    Remove: {
        Role: removeRole
    },
    Set: {
        Presence: setPresence
    },
    User: {
        Ban: banUser,
        Unban: unbanUser,
        Timeout: timeoutUser,
        SetNick: changeNick,
        Check: {
            Permissions: checkUserPerms
        },
        Info: userinfo
    },
    Loop: loop,
    Message: {
        Split: {
            SetText: textSplit,
            GetText: splitText,
            GetLength: getTextSplitLength
        },
        Check: {
            Contains: checkContains
        }
    },
    Buttons: {
        Build: Buttons,
        Edit: EditButton.Edit
    }
}