const request = require("request");
const {
  ApplicationCommandOptionType,
  EmbedBuilder,
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  REST,
  Routes,
} = require("discord.js");
const puppeteer = require("puppeteer");
const { CommandType } = require("wokcommands");
module.exports = {
  name: "airesponse", // Required
  category: "general", // Required for the slash commands
  description: "get a response from ai", // Required for the slash commands
  type: CommandType.SLASH, // If options are given then slash must be either true or 'both'
  testOnly: false,
  deferReply: true, // Ensure you have test servers setup

  options: [
    {
      name: "message",
      description: "Enter the song URL so the bot can download it.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  callback: async ({ interaction, args, client, message }) => {
     
      

    async function getResponce() {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto("https://chat-app-f2d296.zapier.app/");

      const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]';
      await page.waitForSelector(textBoxSelector);

      await page.type(textBoxSelector, args[0]);
      await page.keyboard.press("Enter");

      await page
        .waitForSelector('[data-testid="final-bot-response"] p')
        .catch((err) => {
          return;
        });

        value = await page.$eval(
          '[data-testid="final-bot-response"]',
          (element) => element.textContent
        );

      await browser.close();

        return value.trim();
      }
      
        const response = await getResponce();

      const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(`AI Response`)
          .setDescription(response);
      console.log(args[0]);

      
        interaction.editReply({ embeds: [embed] });
      
    },
  

};
