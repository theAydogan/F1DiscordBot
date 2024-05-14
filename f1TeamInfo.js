//StAuth10222: I Ahmet Aydogan, 000792453 certify that this material is my original work. 
//No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('f1teams')
        .setDescription('Gets you the information of what teams a driver drove for in a specific circuit')
        .addStringOption(option =>
            option.setName('driver')
                .setDescription('Name of driver')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('circuit')
                .setDescription('Name of circuit')
                .setRequired(true)),
    async execute(interaction) {
        try {
            const f1Driver = interaction.options.getString('driver');
            const f1Ciruit = interaction.options.getString('circuit')
            const yearResponse = await axios.get(`http://ergast.com/api/f1/drivers/${f1Driver}/circuits/${f1Ciruit}/constructors.json`);

            const f1Season = yearResponse.data.MRData.ConstructorTable.Constructors;
            let listOfConstructors = '\nConstructors: \n';

            for (let i = 0; i < f1Season.length; i++) {
                listOfConstructors += `${f1Season[i].name}\n`;
            }

            const reply = `In the ${f1Ciruit} circuit, ${f1Driver} drove for these teams: \n${listOfConstructors}`;
            await interaction.reply(reply);
        }
        catch (error) {
            console.error(error);
            await interaction.reply(`Sorry, I couldn't fetch the constructor details right now.`);
        }
    },
};
