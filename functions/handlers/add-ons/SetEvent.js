const events = {
  applicationCommandCreate: 'applicationCommandCreate',
  applicationCommandDelete: 'applicationCommandDelete',
  applicationCommandUpdate: 'applicationCommandUpdate',
  channelCreate: 'channelCreate',
  channelDelete: 'channelDelete',
  channelPinsUpdate: 'channelPinsUpdate',
  channelUpdate: 'channelUpdate',
  emojiCreate: 'emojiCreate',
  emojiDelete: 'emojiDelete',
  emojiUpdate: 'emojiUpdate',
  guildBanAdd: 'guildBanAdd',
  guildBanRemove: 'guildBanRemove',
  guildCreate: 'guildCreate',
  guildDelete: 'guildDelete',
  guildIntegrationsUpdate: 'guildIntegrationsUpdate',
  guildMemberAdd: 'guildMemberAdd',
  guildMemberAvailable: 'guildMemberAvailable',
  guildMemberRemove: 'guildMemberRemove',
  guildMembersChunk: 'guildMembersChunk',
  guildMemberUpdate: 'guildMemberUpdate',
  guildScheduledEventCreate: 'guildScheduledEventCreate',
  guildScheduledEventDelete: 'guildScheduledEventDelete',
  guildScheduledEventUpdate: 'guildScheduledEventUpdate',
  guildScheduledEventUserAdd: 'guildScheduledEventUserAdd',
  guildScheduledEventUserRemove: 'guildScheduledEventUserRemove',
  guildUnavailable: 'guildUnavailable',
  guildUpdate: 'guildUpdate',
  interactionCreate: 'interactionCreate',
  invalidated: 'invalidated',
  inviteCreate: 'inviteCreate',
  inviteDelete: 'inviteDelete',
  messageCreate: 'messageCreate',
  messageDelete: 'messageDelete',
  messageDeleteBulk: 'messageDeleteBulk',
  messageReactionAdd: 'messageReactionAdd',
  messageReactionRemove: 'messageReactionRemove',
  messageReactionRemoveAll: 'messageReactionRemoveAll',
  messageReactionRemoveEmoji: 'messageReactionRemoveEmoji',
  messageSnapshots: 'messageSnapshots',
  messageUpdate: 'messageUpdate',
  presenceUpdate: 'presenceUpdate',
  rateLimit: 'rateLimit',
  ready: 'ready',
  roleCreate: 'roleCreate',
  roleDelete: 'roleDelete',
  roleUpdate: 'roleUpdate',
  shardDisconnect: 'shardDisconnect',
  shardError: 'shardError',
  shardReady: 'shardReady',
  shardReconnecting: 'shardReconnecting',
  shardResume: 'shardResume',
  stageInstanceCreate: 'stageInstanceCreate',
  stageInstanceDelete: 'stageInstanceDelete',
  stageInstanceUpdate: 'stageInstanceUpdate',
  stickerCreate: 'stickerCreate',
  stickerDelete: 'stickerDelete',
  stickerUpdate: 'stickerUpdate',
  threadCreate: 'threadCreate',
  threadDelete: 'threadDelete',
  threadListSync: 'threadListSync',
  threadMembersUpdate: 'threadMembersUpdate',
  threadMemberUpdate: 'threadMemberUpdate',
  threadUpdate: 'threadUpdate',
  typingStart: 'typingStart',
  userUpdate: 'userUpdate',
  voiceStateUpdate: 'voiceStateUpdate',
  warn: 'warn',
  webhookUpdate: 'webhookUpdate'
};

function newEvent(eventModule) {
  const { type, code } = eventModule;

  if (!events[type]) {
    return console.error(`Invalid event type: ${type}`);
  }

  return (client) => {
    client.on(type, async (...args) => {
      try {
        await code(...args);
      } catch (error) {
        console.error(`Error in ${type} event handler:`, error);
      }
    });
  };
}

module.exports = { newEvent, events };
