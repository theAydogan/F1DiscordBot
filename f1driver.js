//StAuth10222: I Ahmet Aydogan, 000792453 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1driver')
        .setDescription('Fetch F1 driver details for this current season')
        .addStringOption(option =>
            option.setName('drivername')
                .setDescription('Last name of the first F1 driver')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('drivername2')
                .setDescription('Last name of the second F1 driver')
                .setRequired(true)),
    async execute(interaction) {
        const driverName = interaction.options.getString('drivername');
        const driverName2 = interaction.options.getString('drivername2');

        try {
            // Fetch driver data for the first driver from Ergast API.
            const driverResponse = await axios.get(`http://ergast.com/api/f1/drivers/${driverName}.json`);
            // Fetch driver data for the second driver from Ergast API.
            const driverResponse2 = await axios.get(`http://ergast.com/api/f1/drivers/${driverName2}.json`);
            // Fetch current season driver standings.
            const driver1StandingsResponse = await axios.get('https://ergast.com/api/f1/current/driverStandings.json');

            const driver1Data = driverResponse.data.MRData.DriverTable.Drivers[0];
            const driver2Data = driverResponse2.data.MRData.DriverTable.Drivers[0];
            const standings = driver1StandingsResponse.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

            // Extract standings information for both drivers.
            const driver1Standing = standings.find(function (driver) {
                return driver.Driver.driverId === driver1Data.driverId;
            });

            const driver2Standing = standings.find(function (driver) {
                return driver.Driver.driverId === driver2Data.driverId;
            });

            // Construct the reply string comparing the two drivers.
            const reply = `${driver1Data.givenName} ${driver1Data.familyName} is of ${driver1Data.nationality} origin who is currently in ${driver1Standing.position} place, and ${driver2Data.givenName} ${driver2Data.familyName} is of ${driver2Data.nationality} origin who is currently in ${driver2Standing.position} place`;
            await interaction.reply(reply);
        } catch (error) {
            await interaction.reply(`Sorry, I couldn't fetch the driver details right now.`);
        }
    },
};
