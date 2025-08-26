const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("factionstats")
    .setDescription("Display faction statistics and leaderboard"),
  async execute(interaction) {
    const guild = interaction.guild;
    
    // Faction mapping
    const factions = {
      "Laughing_Meeks": "Laughing Meeks",
      "Unicorn_Rapists": "Unicorn Rapists", 
      "Special_Activities_Directive": "Special Activities Directive"
    };

    let statsData = [];
    
    for (const [key, displayName] of Object.entries(factions)) {
      const role = guild.roles.cache.find(r => r.name === displayName);
      if (role) {
        const memberCount = role.members.size;
        statsData.push({
          name: displayName,
          members: memberCount,
          role: role
        });
      }
    }

    // Sort by member count
    statsData.sort((a, b) => b.members - a.members);

    const embed = new EmbedBuilder()
      .setTitle("馃弳 Faction Leaderboard")
      .setColor(0x00AE86)
      .setThumbnail(interaction.guild.iconURL())
      .setTimestamp();

    let description = "**馃幆 Compete for faction dominance!**\n\n";
    statsData.forEach((faction, index) => {
      const medals = ["馃", "馃", "馃"];
      const medal = medals[index] || "馃弲";
      const percentage = ((faction.members / guild.memberCount) * 100).toFixed(1);
      const progressBar = "鈻�".repeat(Math.max(1, Math.round(percentage / 5))) + "鈻�".repeat(20 - Math.max(1, Math.round(percentage / 5)));
      
      description += `${medal} **${faction.name}**\n`;
      description += `馃懃 ${faction.members} members (${percentage}%)\n`;
      description += `${progressBar}\n\n`;
    });

    embed.setDescription(description);
    embed.addFields({
      name: "馃搱 Server Statistics",
      value: `馃幆 Total Faction Members: ${statsData.reduce((sum, f) => sum + f.members, 0)}\n馃搳 Total Server Members: ${guild.memberCount}\n馃彺鈥嶁槧锔� Faction Participation: ${(statsData.reduce((sum, f) => sum + f.members, 0) / guild.memberCount * 100).toFixed(1)}%\n馃挭 Competition Level: ${statsData.length > 1 ? "Active" : "Recruiting"}`,
      inline: false
    });

    await interaction.reply({ embeds: [embed] });
  },
};
