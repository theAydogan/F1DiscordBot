const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Adds two numbers')
		.addNumberOption(function(option){
			option.setName('number1');
			option.setRequired(true);
            option.setDescription('The first number');
            return option;
		})
		.addNumberOption(function(option){
			option.setName('number2');
			option.setRequired(true);
            option.setDescription('The second number');
            return option;
		}),
	async execute(interaction) {
        const numOne = interaction.options.getNumber('number1');
        const numTwo = interaction.options.getNumber('number2');
        const sum = numOne + numTwo
        return await interaction.reply(`The sum is: ${sum}`);
        
	},
};
