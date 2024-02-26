const { ApplicationCommandOptionType } = require("discord.js");
const { CommandType } = require("wokcommands");
module.exports = {
  category: "test", // Required for the slash commands
  description: "Adds two numbers", // Required for the slash commands
  type: CommandType.SLASH, // If options are given then slash must be either true or 'both'
  testOnly: true, // Ensure you have test servers setup

  options: [
    {
      name: "num1", // Must be lower case
      description: "The first number.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "num2", // Must be lower case
      description: "The second number.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  callback: ({ interaction, args }) => {
    const num1 = parseInt(args[0]);
    const num2 = parseInt(args[1]);

    if (interaction) {
      interaction.reply({
        content: String(num1 + num2),
      });
    }
  },
};
