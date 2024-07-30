const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUd4cnQ0QmdWanhLbVV2NGNQMUw3RmpNa2lRRHZOaDRpcmV1ditWVEoyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSktOaFhQbFdIYlRubXB5QUgrTDIzOGttZ3FkWEQ4aGs4MGxLV0xuZWl4Zz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvQThaRGhGTDhzaEQ4bWgwaU53STRCU3VLVmtyZGpsZllweXpkMFQ3MWw4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrVHhyZUFJSm00VVVrcU96bXVGSVJtVlgzd0c4NkJucUkzYmhQY1hFcWhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlNYVMrYWVCaTlMblRwQWJtTnFiQXFCL3NSdWtNWjlRK2FhQUxzNnNjV009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InliRFNyWFhWNHh0Qkx4VnlRZ0R0VG1GeTJxYTJ0TFc2c3ByVHp2NTJlVm89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEI1TlMzU2RQd0RBY0FCRTdSSHlycXJpQk1McUtvckdhU1V2TnhSWlpHVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnRTQTR4UkZvaCtWRU00djZ4aCs2QmdTZVpza2NSeVpwYmk4eGhZQ2IwND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing5aWs5SU16YkZNZDZPZGF5YkNGSU12WHlhVmFwRG9wSTBsWVlPSTFYc3JlZi9OZDFzQkpkbWRrSjdweUF6NVlWQWt0ZWRNbktLa1dtb1lKbTczNER3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA5LCJhZHZTZWNyZXRLZXkiOiJrcFR5UkdEQ2VXQkNjd2Y2d1oxLzc4YlZWR0t2OGpQK2Z6WFI0dmI0a3NjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDEwMzUyNDQyNUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxQ0I0MDdCOTNDQzk0NEI3REQzNzA5NjczMDAzMTczQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIyMzY3OTU3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQxMDM1MjQ0MjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjhFN0U2NTVEQzA0NEYwRjk2NzM4MzhCNUUxMkUzRTAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMjM2Nzk1OH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYXZCWFIxTi1TY2Frc3JnZUJ1ZlVlUSIsInBob25lSWQiOiI4YjY5MDU3Mi1lNGRjLTRlNjctYWE1My1iZmVkZjIwNjU2Y2UiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiejlKSUo0UHIyZDJqWHZTbW1KQ2RPMmJOWlBFPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZsc1hCaGVwTVZQeDNJUE1GQURTcmdPYXJTZz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGV1c5R05FNCIsIm1lIjp7ImlkIjoiMjU0MTAzNTI0NDI1Ojg4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuCmmOCngeCmruCmquCnjeCmsOCnh+CmruCngOKAlOCmj+CmsCBCT1QifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xIQWpvSUNFTWIvcExVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImpiVGh6ampwVS82QnNtSm1pYU90RzJoVnJ2cGRKYkw5ZTNPUlp3QTR4WHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkF3a0c1bThtMy9iS2tGbjVlaWx5UGhZYXhZbk92clpHSUVTUlBxVGVkbnNUSDErYWhVTTgyQnl0VkVJTTJMQzNkYmY4bnp6NGswTklUNWF0TzNVcERnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJuTU82N2t1UFNnbVpMbEJZQ2NTek1KajZ2THpvcVNHeDNxczNMNFRNV29sMnFaSkd6Rk1OVUdhNnplc0dmS1R0SUVGUjFPYVE5anVtb253Z0J3OEZDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDEwMzUyNDQyNTo4OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZMjA0YzQ0NlZQK2diSmlab21qclJ0b1ZhNzZYU1d5L1h0emtXY0FPTVY4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMzY3OTU0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUp3UiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐴𝑅𝐸  𝐷𝐴𝑉𝐼𝐿 ♡⁠‿⁠♡",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "919832962298",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𓆩‎ঘুমপ্রেমী𓆪—MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/975f1f7876cd04c139bd9.jpg',
        
        
    
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
