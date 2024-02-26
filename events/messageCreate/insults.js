const Perspective = require("perspective-api-client");
const {Client, IntentsBitField, Partials,  Collection } = require("discord.js");
const perspective = new Perspective({
  apiKey: "AIzaSyDZhDCVhfq9Yu8ty35gwsFPKhV52Kx54iU",
});

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
});

module.exports = async (message) => {
  console.log(message.content);
  client.punishments = new Collection();
   if (message.author.bot) return;

  const result = await perspective.analyze({
    comment: { text: message.content },
    languages: ["ar", "en", "ru"],
    requestedAttributes: { PROFANITY: {}, TOXICITY: {} },
  });
  console.log(JSON.stringify(result, null, 2));
  if (!result || !result.attributeScores || !result.attributeScores.TOXICITY)
    return;
  const score = result.attributeScores.PROFANITY.summaryScore.value && result.attributeScores.TOXICITY.summaryScore.value;
  if (score > 0.6) {
    console.log(
      `Toxic message: "${message.content}" Message toxicity score is "${
        score * 100
      }%"`
    );
    // 5 minutes// 5 minutes
    const punishments = (client.punishments.get(message.author.id) || 0) + 1;
    client.punishments.set(message.author.id, punishments);
    // Calculate timeout duration
    const time = 1000 * 60 * 5 * punishments;

    console.log(time);
    message.delete();
    message.member
      .timeout(time, "Toxic Message detected using our AI")
      .then(() => {
        message.channel.send(
          `User <@${message.author.id}> has been timed out for ${
            punishments * 5
          } minutes`
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

};
