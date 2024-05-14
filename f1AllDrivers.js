//StAuth10222: I Ahmet Aydogan, 000792453 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1driverlist')
        .setDescription('Gets you a list of driver names for a specific season')
        .addStringOption(option =>
            option.setName('year')
                .setDescription('The year of the season you want to see the driver list of')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const f1Year = interaction.options.getString('year');
            const yearResponse = await axios.get(`http://ergast.com/api/f1/${f1Year}/drivers.json`);

            const f1Season = yearResponse.data.MRData.DriverTable.Drivers;
            let listOfRaces = 'Drivers: \n';

            for (let i = 0; i < f1Season.length; i++) {
                listOfRaces += `${[i + 1]}. \t${f1Season[i].givenName} ${f1Season[i].familyName} \n`;
            }

            const reply = `\n${listOfRaces}`;
            await interaction.reply(reply);
        } catch {
            console.error(error);
            await interaction.reply(`Sorry, I couldn't fetch the driver details right now.`);
        }
    },
};
