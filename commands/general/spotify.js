const request = require("request");
const { ApplicationCommandOptionType } = require("discord.js");
const { CommandType } = require("wokcommands");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  name: "spotify", // Required
  category: "general", // Required for the slash commands
  description: "download any song from spotify using the song link", // Required for the slash commands
  type: CommandType.SLASH, // If options are given then slash must be either true or 'both'
  testOnly: false, // Ensure you have test servers setup

  options: [
    {
      name: "link",
      description: "Enter the song URL so the bot can download it.",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
   callback: ({ interaction, args, client }) => {
    
    const url = args[0];

    const options = {
      method: "GET",
      url: "https://spotify-downloader6.p.rapidapi.com/spotify",
      qs: {
        spotifyUrl: url,
      },
      headers: {
        "X-RapidAPI-Key": "a334c5e7f8msh09a2f3ab14d43b0p188443jsn343ae751d1e4",
        "X-RapidAPI-Host": "spotify-downloader6.p.rapidapi.com",
      },
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      
        const parsedBody = JSON.parse(body);
      console.log(parsedBody);
      

        const spotifyEmbed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle(`download ${parsedBody.title} from spotify`)
          .setURL(parsedBody.download_link)
          .setAuthor({
            name: "CloxBot",
          })
          .setThumbnail(parsedBody.cover)
          .addFields(
            { name: "Type", value: `${parsedBody.type}`, inline: true },
            {
              name: "Artist",
              value: `${parsedBody.artist}`,
              inline: true,
            }
          )
          .setTimestamp()
          .setFooter({
            text: "CloxBot",
            iconURL: client.user.displayAvatarURL(),
          });

      if (interaction) {
          interaction.deferReply({ ephemeral: true });
          if (parsedBody.message === "Invalid URL.") {
            interaction.editReply({
              content: "The URL you entered is invalid.",
              ephemeral: true,
            });
          } else {
              interaction.editReply({ embeds: [spotifyEmbed] });
              console.log(parsedBody);
            
          }
        } else {
          // Handle non-interaction case if needed
          console.log(parsedBody);
        }

    });
  },
};