//StAuth10222: I Ahmet Aydogan, 000792453 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1raceresult')
        .setDescription('Gets you the information of the final results of a race for a specific year and round')
        .addStringOption(option =>
            option.setName('year')
                .setDescription('Season number')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('round')
                .setDescription('Number for the round of the race')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const f1Year = interaction.options.getString('year');
            const f1Round = interaction.options.getString('round')
            const yearResponse = await axios.get(`http://ergast.com/api/f1/${f1Year}/${f1Round}/results.json`);

            const f1Season = yearResponse.data.MRData.RaceTable.Races;

            let listOfResults = `\n${f1Season[0].raceName} Results:\n\n`;
            for (let i = 0; i < f1Season.length; i++) {
                for (let j = 0; j < f1Season[i].Results.length; j++) {
                    listOfResults += `${f1Season[i].Results[j].position}\t${f1Season[i].Results[j].Driver.code} \t ${f1Season[i].Results[j].Driver.givenName} ${f1Season[i].Results[j].Driver.familyName} \t Points: ${f1Season[i].Results[j].points} \n`;
                }
            }


            const reply = `In the ${f1Year}, for round ${f1Round} the result was: \n${listOfResults}`;
            await interaction.reply(reply);
        }
        catch (error) {
            console.error(error);
            await interaction.reply(`Sorry, I couldn't fetch the constructor and driver details right now.`);
        }
    },
};
