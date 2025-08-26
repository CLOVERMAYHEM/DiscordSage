const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Initialize faction points system
if (!global.factionPoints) global.factionPoints = {
  "Laughing_Meeks": { points: 0, victories: 0, activities: 0 },
  "Unicorn_Rapists": { points: 0, victories: 0, activities: 0 },
  "Special_Activities_Directive": { points: 0, victories: 0, activities: 0 }
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("factionpoints")
    .setDescription("View faction points and achievements"),
  async execute(interaction) {
    const factionData = global.factionPoints;
    
    // Convert to array and sort by points
    const sortedFactions = Object.entries(factionData)
      .map(([key, data]) => ({
        name: key.replace("_", " "),
        key: key,
        ...data
      }))
      .sort((a, b) => b.points - a.points);
    
    const embed = new EmbedBuilder()
      .setTitle("馃弳 Faction Points & Achievements")
      .setColor(0xFFD700)
      .setDescription("Compete for faction supremacy!")
      .setTimestamp();
    
    let leaderboardText = "";
    sortedFactions.forEach((faction, index) => {
      const medals = ["馃", "馃", "馃"];
      const medal = medals[index] || "馃弲";
      
      // Calculate faction level based on points
      let level = Math.floor(faction.points / 100) + 1;
      let levelEmoji = "猸�";
      if (level >= 10) levelEmoji = "馃専";
      if (level >= 20) levelEmoji = "馃挮";
      if (level >= 50) levelEmoji = "鉁�";
      
      leaderboardText += `${medal} **${faction.name}**\n`;
      leaderboardText += `${levelEmoji} Level ${level} 鈥� ${faction.points} points\n`;
      leaderboardText += `鈿旓笍 Victories: ${faction.victories} 鈥� 馃搱 Activities: ${faction.activities}\n\n`;
    });
    
    embed.addFields({ 
      name: "馃彺 Faction Rankings", 
      value: leaderboardText, 
      inline: false 
    });
    
    // Add point earning info
    embed.addFields({
      name: "馃搳 How to Earn Points",
      value: `馃幆 Voice time: 1 pt/hour\n鈿旓笍 Battle victory: 50 pts\n馃弳 Daily #1: 25 pts\n馃幉 Command usage: 1 pt\n馃挰 Activity: 0.5 pts/msg`,
      inline: false
    });
    
    await interaction.reply({ embeds: [embed] });
  },
};
