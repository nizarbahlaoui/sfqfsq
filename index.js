const express = require("express");
const app = express();

app.get('/', (req, res) => {
	res.send('Hello Express app!');
});

const {
    Client,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ModalBuilder,
    TextInputStyle,
    TextInputBuilder
} = require('discord.js');
const client = new Client({ intents: ['Guilds', 'MessageContent', 'GuildMessages'] });
const config = require('./config.json');
require('dotenv').config();
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
})

app.listen(() => console.log("Server started"));

client.on('messageCreate', (message) => {
    if (message.content === '!setup') {
        const embed = new EmbedBuilder()
        .setTitle('<a:3493diamond2:1068507602541097051>  Welcome To Canada City <a:9048bluemendedheart:1068521914655588372>  Apply Here For Whitelist')
.setImage("https://media.discordapp.net/attachments/1064005312559988738/1068675030378106880/rp123.png")
         .setDescription(`$ <a:1199diamond11:1068507595205267528>  Age +18

$ <a:1199diamond11:1068507595205267528> No Toxic

$ <a:1199diamond11:1068507595205267528>  Read all Server Rules & respect Players`,true)
          
        .setColor('#2f3136')
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle(ButtonStyle.Success)
            .setLabel('apply')
            .setCustomId('apply')
        )
        const channel = message.guild.channels.cache.get(config.applyroom);
        if (!channel) return;
        channel.send({
            embeds: [embed],
            components: [row]
        })
    }
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'apply') {
            const modal = new ModalBuilder()
            .setTitle('Apply')
            .setCustomId('staff_apply')
            const nameComponent = new TextInputBuilder()
            .setCustomId('q1')
            .setLabel(`${config.q1}`)
            .setMinLength(2)
            .setMaxLength(25)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)
            const ageComponent = new TextInputBuilder()
            .setCustomId('q2')
            .setLabel(`${config.q2}`)
            .setMinLength(1)
            .setMaxLength(2)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            const whyYou = new TextInputBuilder()
            .setCustomId(`q3`)
            .setLabel(`${config.q3}`)
            .setMinLength(2)
            .setMaxLength(120)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            const q4 = new TextInputBuilder()
            .setCustomId('q4')
            .setLabel(`${config.q4}`)
            .setMaxLength(400)
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            const q5 = new TextInputBuilder()
            .setCustomId('q5')
            .setLabel(`${config.q5}`)
            .setMaxLength(400)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            const rows = [nameComponent, ageComponent,whyYou,q4,q5].map(
                (component) => new ActionRowBuilder().addComponents(component)
            )
            modal.addComponents(...rows);
            interaction.showModal(modal);
        }
    }
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'staff_apply') {
            const q1 = interaction.fields.getTextInputValue('q1');
            const q2 = interaction.fields.getTextInputValue('q2');
            const q3 = interaction.fields.getTextInputValue('q3');
            const q4 = interaction.fields.getTextInputValue('q4');
            const q5 = interaction.fields.getTextInputValue('q5');
            interaction.reply({
                content: '✅ | **تم أرسال تقديمك بنجاح**',
                ephemeral: true
            })
            const staffSubmitChannel = interaction.guild.channels.cache.get(config.staffroom);
            if (!staffSubmitChannel) return;
            const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .setColor('Green')
            .setTimestamp()
            .setFooter({ text: interaction.user.id })
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                {
                    name: `${config.q1}`,
                    value: q1
                },
                {
                    name: `${config.q2}`,
                    value: q2
                },
                {
                    name: `${config.q3}`,
                    value: q3
                },
                {
                    name: `${config.q4}`,
                    value: q4
                },
                {
                    name: `${config.q5}`,
                    value: q5
                }
            )
            staffSubmitChannel.send({
                embeds: [embed],
            })
        }
    }
})

var statuss = ["Bot","Youtube","By","わ 𝕳𝖆𝖒𝖎𝖉 わ#2681","Add","To Server"];
var secound = 5;
client.on("ready", () =>{

console.log(`${client.user.tag} Is Available`);
client.user.setActivity("ScriptorNOob ✨", {type: "STREAMING", url: "https://twitch.tv/random"})


})

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Process Kill 1")
    process.kill(1);
  } else {
  console.log("Client Login")
  }
}, 3000);
process.on("unhandledRejection", error => {
    return;
});
process.on("rejectionHandled", error => {
    return;
});
process.on("uncaughtException", error => {
    return;
});

client.login(process.env.TOKEN)
