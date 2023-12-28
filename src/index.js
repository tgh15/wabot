const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    puppeteer: { headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']}, 
    session: sessionCfg,
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async(msg) => {
    if(msg.body.startsWith('!stiker') && msg.type === "image"){
        const media = await msg.downloadMedia()

        client.sendMessage(msg.from, media, {
            sendMediaAsSticker: true,
            stickerAuthor: "@tgh15"
        })
    }
})

client.initialize();
 