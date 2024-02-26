const request = require("request");
const { ApplicationCommandOptionType } = require("discord.js");
const { CommandType } = require("wokcommands");
const { EmbedBuilder } = require("discord.js");
module.exports = {
    name: "airesponse", // Required
    category: "general", // Required for the slash commands
    description: "get a response from ai", // Required for the slash commands
    type: CommandType.SLASH, // If options are given then slash must be either true or 'both'
    testOnly: false, // Ensure you have test servers setup

    options: [
        {
            name: "",
            description: "Enter the song URL so the bot can download it.",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],
    callback: ({ interaction, args, client }) => {
    
      
      
      
    }
}