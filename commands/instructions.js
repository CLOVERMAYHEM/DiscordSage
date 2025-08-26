const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("instructions")
    .setDescription("Post faction join instructions for users")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const instructionMessage = [
      "馃彺鈥嶁槧锔� **HOW TO JOIN A FACTION**",
      "",
      "**Step 1:** Type `/factions` to see available factions",
      "**Step 2:** Select the faction you want to join from the dropdown menu",
      "**Step 3:** Wait for faction leaders to review your request",
      "",
      "**Available Factions:**",
      "鈥� **Laughing Meeks**",
      "鈥� **Unicorn Rapists**",
      "鈥� **Special Activities Directive**",
      "",
      "**Note:** You can only be in one faction at a time!",
      "",
      "鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€"
    ].join("\n");

    await interaction.reply({ content: instructionMessage });
  },
};
