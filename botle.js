const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const axios = require('axios');
const updateLogger = require('telegraf-update-logger');
const sett = JSON.parse(fs.readFileSync(`./ler/settings.json`))
const { fetchJson } = require('./lib/func');
const bot = new Telegraf(sett.token);
const lolhum = sett.lolhum
const chalk = require('chalk');
const prefix = sett.prefix
//KNTOL
function sendsearch(ctx){
    // let chatId = msg.chat.id;
    let botReply = "Wait, the bot is being searched"
    bot.telegram.sendMessage(ctx.chat.id ,botReply)
        .then((result) => { setTimeout(() => {
            bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 *  250)})
        .catch(err => console.log(err))
    }
    function sendLoading(ctx){
    // let chatId = msg.chat.id;
    let botReply = "Wait, Data is being sent"
    bot.telegram.sendMessage(ctx.chat.id ,botReply)
        .then((result) => { setTimeout(() => {
            bot.telegram.deleteMessage(ctx.chat.id, result.message_id)
        }, 10 *  1000)})
        .catch(err => console.log(err))
    }
//CMD
bot.use(
    updateLogger({
      colors: {
        id: chalk.red,
        chat: chalk.yellow,
        user: chalk.green,
        type: chalk.bold,
      },
    }),
  );
bot.command('/start', (ctx) => {
  return ctx.replyWithPhoto({ url: 'https://telegra.ph/file/a2432a9ddcc3a6cdb040f.jpg' },
    {
      caption: `Haiii\nWellcome To Bottle Bot`,
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Menu', 'menu'),
        Markup.button.callback('Info', 'info')
      ])
    }
  )
})
bot.action('info', async (ctx) => {
  return await ctx.reply('BELUM BERES TODD', Markup
    .keyboard([
      ['/menu']
    ])
    .oneTime()
    .resize()
  )
})
bot.action('menu', async (ctx) => {
  return await ctx.reply('PILIH NGABS!!', Markup
    .keyboard([
      ['DOWNLOAD']
    ])
    .oneTime()
    .resize()
  )
})
bot.command('menu', async (ctx) => {
  return await ctx.reply('PILIH NGABS!!', Markup
    .keyboard([
      ['DOWNLOAD']
    ])
    .oneTime()
    .resize()
  )
})
bot.hears('DOWNLOAD', ctx => ctx.reply(`DOWNLOAD MENU\n${prefix}play\n${prefix}play2\n${prefix}ytmp4`))
bot.command('play', async (ctx) => {
        let input = ctx.message.text
        let inputArray = input.split(" ")
        let message = "";
        
        if(inputArray.length == 1){
            message = "Harap masukan judul, Contoh /play snowman"
            ctx.reply(message)
        } else{
            sendsearch(ctx)
            inputArray.shift();
            messager = inputArray.join(" ")
            const date = await fetchJson(`https://api.lolhuman.xyz/api/ytplay2?apikey=${lolhum}&query=${messager}`)
            const data = date.result
            sendLoading(ctx)
            ctx.replyWithAudio({ url: data.audio})
            } 
})
bot.command('play2', async (ctx) => {
        let input = ctx.message.text
        let inputArray = input.split(" ")
        let message = "";
        
        if(inputArray.length == 1){
            message = "Harap masukan judul, Contoh /play2 snowman"
            ctx.reply(message)
        } else{
            sendsearch(ctx)
            inputArray.shift();
            messager = inputArray.join(" ")
            const date = await fetchJson(`https://api.lolhuman.xyz/api/ytplay?apikey=${lolhum}&query=${messager}`)
            const data = date.result
            ctx.replyWithPhoto({url: data.info.thumbnail}, {caption: `===========[PLAY]=========
            
Title: ${data.info.title}
Uploader: ${data.info.uploader}
Duration: ${data.info.duration}
            `})
            sendLoading(ctx)
            ctx.replyWithAudio({ url: data.audio.link})
            } 
})
bot.command('ytmp4', async (ctx) => {
        let input = ctx.message.text
        let inputArray = input.split(" ")
        let message = "";
        
        if(inputArray.length == 1){
            message = "Harap masukan judul, Contoh /ytmp4 snowman"
            ctx.reply(message)
        } else{
            sendsearch(ctx)
            inputArray.shift();
            messager = inputArray.join(" ")
            const date = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo?apikey=${lolhum}&url=${messager}`)
            const data = date.result
            ctx.replyWithPhoto({url: data.thumbnail}, {caption: `===========[PLAY]=========
            
Title: ${data.title}
Uploader: ${data.uploader}
Duration: ${data.duration}
            `})
            sendLoading(ctx)
            ctx.replyWithVideo({ url: data.link.link})
            } 
})
bot.launch();