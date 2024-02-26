const { Client, IntentsBitField, Partials } = require("discord.js");
const WOK = require("wokcommands");
const path = require("path");
require("dotenv/config");
const mongoose = require("mongoose");
const mongo = require("./mongo");
const { ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
   
  ],
  partials: [Partials.Channel],
});

client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);

  client.user.setActivity({
    
      
        name: "+help", // Replace with your desired status text
        type: ActivityType.Custom,
        state: "Use /help", // Use the CUSTOM activity type for non-standard activities
       // Optional, can be "idle", "dnd", or "offline"
  });
  mongoose.set("strictQuery", true);
  new WOK({
    // The client for your bot. This is the only required property
    client,
    // Path to your commands folder
    commandsDir: path.join(__dirname, "commands"),
    featuresDir: path.join(__dirname, "features"),
    events: {
      dir: path.join(__dirname, "events"),
    },
    // Your MongoDB connection URI
    mongoUri: process.env.MONGO_URI || "",
    testServers: ["1145899991307653201"],
    botOwners: ["257147010488991744"],
    disabledDefaultCommands: [
      // DefaultCommands.ChannelCommand,
      // DefaultCommands.CustomCommand,
      // DefaultCommands.Prefix,
      // DefaultCommands.RequiredPermissions,
      // DefaultCommands.RequiredRoles,
      // DefaultCommands.ToggleCommand
    ],
    // Configure the cooldowns for your commands and features
    cooldownConfig: {
      errorMessage: "Please wait {TIME} before doing that again.",
      botOwnersBypass: true,
      dbRequired: 300,
    },
    // Dynamic validations
  });
});

client.login(process.env.TOKEN);
