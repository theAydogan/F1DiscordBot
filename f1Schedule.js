//StAuth10222: I Ahmet Aydogan, 000792453 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1schedule')
        .setDescription('Gets you the schedule of any F1 season by year')
        .addStringOption(option =>
            option.setName('year')
                .setDescription('Year of the schedule you want to see')
                .setRequired(true)),
    async execute(interaction) {
        try {
            // Extract the desired year from the user's input.
            const f1Year = interaction.options.getString('year');
            // Fetch the F1 schedule for the provided year from Ergast API
            const yearResponse = await axios.get(`http://ergast.com/api/f1/${f1Year}.json`);

            const f1Season = yearResponse.data.MRData.RaceTable.Races;
            let listOfRaces = 'Races: \n';

            // Loop through all the races for the provided year and append to the list.
            for (let i = 0; i < f1Season.length; i++) {
                listOfRaces += `${f1Season[i].raceName}\n`;
            }

            const reply = `For the ${f1Year} season, the F1 race schedule looked like this: \n${listOfRaces}`;
            await interaction.reply(reply);
        } catch {
            console.error(error);
            await interaction.reply(`Sorry, I couldn't fetch the schedule details right now.`);
        }
    },
};
