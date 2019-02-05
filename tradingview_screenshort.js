const puppeteer = require('puppeteer');
const Telegraf = require('telegraf')
// const bot = new Telegraf(process.env.BOT_TOKEN)
const fs = require('fs')
const img = fs.readFileSync('./example.png')
const SocksAgent = require('socks5-https-client/lib/Agent')
const socksAgent = new SocksAgent({ socksHost: 'localhost', socksPort: 1080 });

var SocksProxyAgent = require('socks-proxy-agent');
var agent = new SocksProxyAgent('socks://127.0.0.1:1080');
const bot = new Telegraf("753812904:AAFp6-Upva0MOo-T9QgiOc7Rs3qNOpJ7wRw", {
  telegram: {
    agent: agent
  }
})

bot.on('text', (ctx) => {
  console.log(ctx.chat.id)
  ctx.reply('Hello World')
})
bot.launch()

setInterval(() => {
  bot.telegram.sendPhoto("-320826333", {source: img, filename:'ex.png'}).then(() => {
    console.log('send success')
  }).catch(e => {
    console.log('send error', e)
  })
}, 10000)

return
let chromePath = ''
if (process.env.NODE_DNV !== 'production') {
  // chromePath = '../chrome-mac/Chromium.app'
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: chromePath,
  })
  const page = await browser.newPage();
  await page.goto('https://www.baidu.com');
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})()