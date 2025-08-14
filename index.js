const { Telegraf } = require('telegraf');
const express = require('express');

// Telegram bot tokenini kiriting
const bot = new Telegraf('7588417820:AAFhXzWurUEH_B9DILSrZ3-h7yduW8rlGKs');

// Express ilovasini yaratish
const app = express();
const port = 3000;

// /start buyrug‘i uchun javob
bot.start((ctx) => {
  ctx.reply('working');
});

// Yangi foydalanuvchi guruhga qo‘shilganda xabarni o‘chirish
bot.on('new_chat_members', async (ctx) => {
  try {
    const messageId = ctx.message.message_id;
    if (messageId) {
      await ctx.deleteMessage(messageId);
      console.log(`Yangi foydalanuvchi xabari o‘chirildi: ${messageId}`);
    }
  } catch (error) {
    console.error('Yangi foydalanuvchi xabarini o‘chirishda xatolik:', error);
  }
});

// Foydalanuvchi guruhni tark etganda xabarni o‘chirish
bot.on('left_chat_member', async (ctx) => {
  try {
    const messageId = ctx.message.message_id;
    if (messageId) {
      await ctx.deleteMessage(messageId);
      console.log(`Tark etgan foydalanuvchi xabari o‘chirildi: ${messageId}`);
    }
  } catch (error) {
    console.error('Tark etgan foydalanuvchi xabarini o‘chirishda xatolik:', error);
  }
});

// Botni ishga tushirish (pulling rejimi)
bot.launch().then(() => {
  console.log('Bot pulling rejimida ishga tushdi');
});

// Express orqali GET so‘rovni qayta ishlash
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Telegram bot guruhda yangi foydalanuvchi qo‘shilganda yoki tark etganda xabarlarni o‘chiradi.',
    bot: 'Telegraf.js orqali ishlaydi',
    mode: 'Pulling',
  });
});

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server http://localhost:${port} da ishlamoqda`);
});

// Botni to‘xtatish uchun signal qabul qilish
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));